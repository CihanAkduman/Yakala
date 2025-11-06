import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { ChatConversation } from '../../api/types/globi-types';
import useGloBiAppContext from '../../contexts/GloBiAppContext/useGloBiAppContext';
import { useDeleteConversation } from '../../api/hooks/conversations/useDeleteConversation';
import { useUpdateConversation } from '../../api/hooks/conversations/useUpdateConversation';

const StyledListItem = styled(ListItemButton)<{ active?: boolean }>(({ theme, active }) => ({
	'&.active': {
		backgroundColor: theme.vars.palette.background.default
	},
	'& .delete-button': {
		opacity: 0,
		transition: 'opacity 0.2s'
	},
	'&:hover .delete-button': {
		opacity: 1
	}
}));

type GloBiConversationListItemProps = {
	item: ChatConversation;
};

function GloBiConversationListItem(props: GloBiConversationListItemProps) {
	const { item } = props;
	const { selectedConversation, setSelectedConversation } = useGloBiAppContext();
	const { mutate: deleteConversation } = useDeleteConversation();
	const { mutate: updateConversation } = useUpdateConversation();

	const isActive = selectedConversation?.id === item.id;
	const lastMessage = item.messages.length > 0 ? item.messages[item.messages.length - 1].content : 'Yeni sohbet';

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (window.confirm('Bu sohbeti silmek istediğinizden emin misiniz?')) {
			deleteConversation(item.id);
			if (isActive) {
				setSelectedConversation(null);
			}
		}
	};

	const handleToggleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation();
		updateConversation({
			...item,
			favorite: !item.favorite
		});
	};

	return (
		<StyledListItem
			className={`min-h-9 px-4 md:px-6 ${isActive ? 'active' : ''}`}
			onClick={() => setSelectedConversation(item)}
		>
			<ListItemText
				classes={{
					root: 'min-w-px pr-4',
					primary: 'font-medium text-base',
					secondary: 'truncate'
				}}
				primary={item.title}
				secondary={lastMessage}
			/>

			<div className="flex flex-col items-end justify-center gap-1">
				<Typography
					className="text-xs whitespace-nowrap"
					color="text.secondary"
				>
					{format(new Date(item.updatedAt), 'dd MMM', { locale: tr })}
				</Typography>
				<div className="flex items-center gap-0.5">
					{item.favorite && (
						<IconButton
							size="small"
							onClick={handleToggleFavorite}
							className="h-6 w-6"
						>
							<FuseSvgIcon
								size={14}
								className="text-red-500"
							>
								lucide:heart
							</FuseSvgIcon>
						</IconButton>
					)}
					<IconButton
						size="small"
						onClick={handleDelete}
						className="delete-button h-6 w-6"
					>
						<FuseSvgIcon
							size={14}
							color="error"
						>
							lucide:trash-2
						</FuseSvgIcon>
					</IconButton>
				</div>
			</div>
		</StyledListItem>
	);
}

export default GloBiConversationListItem;
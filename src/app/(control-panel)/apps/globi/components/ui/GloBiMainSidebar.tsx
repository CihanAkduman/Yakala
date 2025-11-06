import FuseUtils from '@fuse/utils';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GloBiConversationListItem from './GloBiConversationListItem';
import { useConversations } from '../../api/hooks/conversations/useConversations';

type GloBiMainSidebarProps = {
	onNewChat: () => void;
};

function GloBiMainSidebar(props: GloBiMainSidebarProps) {
	const { onNewChat } = props;
	const { data: conversations } = useConversations();
	const [searchText, setSearchText] = useState('');

	function handleSearchText(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchText(event.target.value);
	}

	return (
		<div className="flex flex-auto flex-col">
			<Box
				className="sticky top-0 z-10 flex shrink-0 flex-col px-4 py-4 md:px-6"
				sx={(theme) => ({
					backgroundColor: theme.palette.background.default
				})}
			>
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Box
							className="flex h-10 w-10 items-center justify-center rounded-full"
							sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}
						>
							<FuseSvgIcon size={20}>lucide:bot</FuseSvgIcon>
						</Box>
						<Typography className="text-xl font-semibold">GloBi</Typography>
					</div>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						onClick={onNewChat}
						startIcon={<FuseSvgIcon size={18}>lucide:plus</FuseSvgIcon>}
					>
						Yeni
					</Button>
				</div>
				{useMemo(
					() => (
						<Paper className="flex h-10 w-full items-center gap-2 rounded-lg border-1 px-3 shadow-none">
							<FuseSvgIcon
								size={18}
								color="action"
							>
								lucide:search
							</FuseSvgIcon>
							<Input
								placeholder="Sohbet ara..."
								className="flex flex-1"
								disableUnderline
								fullWidth
								value={searchText}
								slotProps={{
									input: {
										'aria-label': 'Search'
									}
								}}
								onChange={handleSearchText}
							/>
						</Paper>
					),
					[searchText]
				)}
			</Box>
			<div className="flex-auto">
				<List className="w-full">
					{useMemo(() => {
						if (!conversations) {
							return null;
						}

						function getFilteredArray<T>(arr: T[], _searchText: string): T[] {
							if (_searchText.length === 0) {
								return arr;
							}
							return FuseUtils.filterArrayByString(arr, _searchText);
						}

						const filteredConversations = getFilteredArray([...conversations], searchText).sort(
							(a, b) => b.updatedAt - a.updatedAt
						);

						const container = {
							show: {
								transition: {
									staggerChildren: 0.02
								}
							}
						};

						const item = {
							hidden: { opacity: 0, y: 10 },
							show: { opacity: 1, y: 0 }
						};

						return (
							<motion.div
								className="flex shrink-0 flex-col"
								variants={container}
								initial="hidden"
								animate="show"
							>
								{filteredConversations.length > 0 && (
									<motion.div variants={item}>
										<Typography
											className="px-4 pt-4 pb-2 text-lg font-semibold md:px-6"
											color="secondary.main"
										>
											Sohbetler
										</Typography>
									</motion.div>
								)}

								{filteredConversations.map((conversation) => (
									<motion.div
										variants={item}
										key={conversation.id}
									>
										<GloBiConversationListItem item={conversation} />
									</motion.div>
								))}

								{filteredConversations.length === 0 && (
									<Box className="flex flex-col items-center justify-center py-12">
										<FuseSvgIcon
											size={48}
											color="disabled"
										>
											lucide:message-square
										</FuseSvgIcon>
										<Typography
											className="mt-4"
											color="text.secondary"
										>
											{searchText ? 'Sohbet bulunamadı' : 'Henüz sohbet yok'}
										</Typography>
										{!searchText && (
											<Button
												variant="outlined"
												color="secondary"
												className="mt-4"
												onClick={onNewChat}
												startIcon={<FuseSvgIcon>lucide:plus</FuseSvgIcon>}
											>
												Yeni Sohbet Başlat
											</Button>
										)}
									</Box>
								)}
							</motion.div>
						);
					}, [conversations, searchText, onNewChat])}
				</List>
			</div>
		</div>
	);
}

export default GloBiMainSidebar;
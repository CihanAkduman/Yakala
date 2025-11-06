import { Paper, Typography, Avatar, Box } from '@mui/material';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '../../api/types/globi-types';

type ChatMessageProps = {
	message: ChatMessageType;
	isLastOfGroup?: boolean;
	isFirstOfGroup?: boolean;
};

function ChatMessage(props: ChatMessageProps) {
	const { message, isLastOfGroup, isFirstOfGroup } = props;
	const isUser = message.role === 'user';

	return (
		<div className={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
			{!isUser && isFirstOfGroup && (
				<Avatar
					sx={{
						backgroundColor: 'secondary.main',
						color: 'secondary.contrastText',
						width: 36,
						height: 36
					}}
				>
					G
				</Avatar>
			)}
			{!isUser && !isFirstOfGroup && <Box sx={{ width: 36, height: 36 }} />}

			<div className={`flex max-w-[70%] flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
				<Paper
					className={`px-4 py-3 ${isLastOfGroup ? '' : 'mb-0.5'}`}
					sx={
						isUser
							? {
									backgroundColor: 'primary.main',
									color: 'primary.contrastText',
									borderRadius: isLastOfGroup ? '8px 8px 3px 8px' : '8px',
									...(isFirstOfGroup && { borderTopRightRadius: '8px' })
							  }
							: {
									borderRadius: isLastOfGroup ? '8px 8px 8px 3px' : '8px',
									...(isFirstOfGroup && { borderTopLeftRadius: '8px' })
							  }
					}
				>
					{isUser ? (
						<Typography
							className="whitespace-pre-wrap text-sm"
							style={{ wordBreak: 'break-word' }}
						>
							{message.content}
						</Typography>
					) : (
						<Box
							sx={{
								'& p': {
									marginBottom: '0.5rem',
									fontSize: '0.875rem',
									lineHeight: '1.25rem',
									wordBreak: 'break-word'
								},
								'& p:last-child': {
									marginBottom: 0
								},
								'& strong': {
									fontWeight: 600
								},
								'& ul, & ol': {
									marginTop: '0.5rem',
									marginBottom: '0.5rem',
									paddingLeft: '1rem'
								},
								'& ul': {
									listStyleType: 'disc'
								},
								'& ol': {
									listStyleType: 'decimal'
								},
								'& li': {
									fontSize: '0.875rem',
									marginBottom: '0.25rem'
								},
								'& h1, & h2, & h3': {
									fontWeight: 600,
									marginTop: '0.75rem',
									marginBottom: '0.5rem'
								},
								'& h1': {
									fontSize: '1.125rem'
								},
								'& h2': {
									fontSize: '1rem'
								},
								'& h3': {
									fontSize: '0.875rem'
								},
								'& code': {
									backgroundColor: 'rgba(0, 0, 0, 0.1)',
									padding: '0.125rem 0.25rem',
									borderRadius: '0.25rem',
									fontSize: '0.75rem'
								},
								'& pre': {
									backgroundColor: 'rgba(0, 0, 0, 0.05)',
									padding: '0.5rem',
									borderRadius: '0.25rem',
									overflowX: 'auto',
									marginTop: '0.5rem',
									marginBottom: '0.5rem'
								},
								'& pre code': {
									backgroundColor: 'transparent',
									padding: 0
								}
							}}
						>
							<ReactMarkdown>{message.content}</ReactMarkdown>
						</Box>
					)}
				</Paper>
				{isLastOfGroup && (
					<Typography
						variant="caption"
						color="text.secondary"
						className="px-1 text-xs"
					>
						{format(new Date(message.timestamp), 'HH:mm', { locale: tr })}
					</Typography>
				)}
			</div>

			{isUser && isFirstOfGroup && (
				<Avatar
					sx={{
						backgroundColor: 'primary.main',
						color: 'primary.contrastText',
						width: 36,
						height: 36
					}}
				>
					S
				</Avatar>
			)}
			{isUser && !isFirstOfGroup && <Box sx={{ width: 36, height: 36 }} />}
		</div>
	);
}

export default ChatMessage;
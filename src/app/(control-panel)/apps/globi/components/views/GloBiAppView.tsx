'use client';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import GloBiMainSidebar from '../ui/GloBiMainSidebar';
import GloBiContent from '../ui/GloBiContent';
import { GloBiAppContextProvider } from '../../contexts/GloBiAppContext/GloBiAppContextProvider';
import useGloBiAppContext from '../../contexts/GloBiAppContext/useGloBiAppContext';
import { useCreateConversation } from '../../api/hooks/conversations/useCreateConversation';
import { ChatConversation } from '../../api/types/globi-types';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .container': {
		maxWidth: '100%!important'
	},
	'& .FusePageSimple-contentWrapper': {
		paddingTop: 2,
		paddingLeft: 2
	},
	'& .FusePageSimple-content': {
		boxShadow: theme.vars.shadows[2],
		borderRadius: '12px 0 0 0',
		[theme.breakpoints.down('md')]: {
			borderRadius: '12px 12px 0 0'
		},
		backgroundColor: theme.vars.palette.background.paper
	},
	'& .FusePageSimple-sidebarWrapper': {
		border: 'none'
	},
	'& .FusePageSimple-sidebarContent': {
		backgroundColor: theme.vars.palette.background.default
	}
}));

function GloBiAppViewContent() {
	const [mainSidebarOpen, setMainSidebarOpen] = useState(true);
	const { setSelectedConversation } = useGloBiAppContext();
	const { mutate: createConversation } = useCreateConversation();

	const handleNewChat = () => {
		const newConversation: ChatConversation = {
			id: `conv-${Date.now()}`,
			title: 'Yeni Sohbet',
			messages: [],
			createdAt: Date.now(),
			updatedAt: Date.now(),
			favorite: false
		};

		createConversation(newConversation, {
			onSuccess: (created) => {
				setSelectedConversation(created);
			}
		});
	};

	return (
		<Root
			content={
				<Paper className="flex min-h-0 flex-auto flex-col overflow-hidden rounded-tr-none">
					<GloBiContent
						onSetMainSidebarOpen={setMainSidebarOpen}
						onNewChat={handleNewChat}
					/>
				</Paper>
			}
			leftSidebarProps={{
				content: <GloBiMainSidebar onNewChat={handleNewChat} />,
				open: mainSidebarOpen,
				onClose: () => {
					setMainSidebarOpen(false);
				},
				width: 400
			}}
			scroll="content"
		/>
	);
}

function GloBiAppView() {
	return (
		<GloBiAppContextProvider>
			<GloBiAppViewContent />
		</GloBiAppContextProvider>
	);
}

export default GloBiAppView;
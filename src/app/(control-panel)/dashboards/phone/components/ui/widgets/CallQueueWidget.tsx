import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

interface QueuedCall {
  id: string;
  customerName: string;
  phone: string;
  waitTime: number;
  priority: 'normal' | 'high' | 'vip';
}

interface CallStats {
  totalToday: number;
  averageDuration: string;
  satisfaction: number;
  queueLength: number;
  averageWaitTime: string;
}

function CallQueueWidget() {
  const theme = useTheme();
  const [queuedCalls, setQueuedCalls] = useState<QueuedCall[]>([
    {
      id: '1',
      customerName: 'Maria Schmidt',
      phone: '+49 123 456 789',
      waitTime: 125, // seconds
      priority: 'normal'
    },
    {
      id: '2',
      customerName: 'Hans Müller',
      phone: '+49 987 654 321',
      waitTime: 45,
      priority: 'vip'
    },
    {
      id: '3',
      customerName: 'Lisa Weber',
      phone: '+49 555 123 456',
      waitTime: 230,
      priority: 'high'
    }
  ]);

  const [stats, setStats] = useState<CallStats>({
    totalToday: 47,
    averageDuration: '3:24',
    satisfaction: 4.7,
    queueLength: 3,
    averageWaitTime: '2:15'
  });

  // Update wait times every second
  useEffect(() => {
    const timer = setInterval(() => {
      setQueuedCalls(prev => 
        prev.map(call => ({
          ...call,
          waitTime: call.waitTime + 1
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatWaitTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'vip': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'vip': return 'VIP';
      case 'high': return 'Hoch';
      default: return 'Normal';
    }
  };

  return (
    <Box
      className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm"
      sx={{
        background: theme.vars.palette.background.paper,
        color: theme.vars.palette.text.primary,
        minHeight: 400
      }}
    >
      <div className="mx-6 mt-6 mb-4">
        <Typography className="text-2xl font-bold mb-2">
          Anruf-Warteschlange
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Wartende Anrufe und Statistiken
        </Typography>
      </div>

      {/* Statistics Cards */}
      <div className="mx-6 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <Typography variant="body2" color="text.secondary">
              Warteschlange
            </Typography>
            <Typography variant="h5" className="font-bold text-blue-600 dark:text-blue-400">
              {stats.queueLength}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ø {stats.averageWaitTime} min
            </Typography>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <Typography variant="body2" color="text.secondary">
              Heute bearbeitet
            </Typography>
            <Typography variant="h5" className="font-bold text-green-600 dark:text-green-400">
              {stats.totalToday}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ø {stats.averageDuration} min
            </Typography>
          </div>
        </div>
        
        <div className="mt-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
          <Typography variant="body2" color="text.secondary">
            Kundenzufriedenheit
          </Typography>
          <div className="flex items-center gap-2">
            <Typography variant="h5" className="font-bold text-purple-600 dark:text-purple-400">
              {stats.satisfaction}/5
            </Typography>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`text-lg ${star <= Math.floor(stats.satisfaction) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <Typography variant="caption" color="text.secondary">
            Basierend auf 35 Bewertungen
          </Typography>
        </div>
      </div>

      <Divider />

      {/* Queued Calls List */}
      <div className="flex-1 overflow-auto">
        <Typography className="mx-6 mt-4 mb-2 font-semibold">
          Wartende Anrufe
        </Typography>
        
        {queuedCalls.length > 0 ? (
          <List className="px-2">
            {queuedCalls.map((call, index) => (
              <ListItem 
                key={call.id}
                className="rounded-lg mb-2 border border-gray-100 dark:border-gray-800"
                sx={{
                  backgroundColor: theme.vars.palette.background.default,
                  '&:hover': {
                    backgroundColor: theme.vars.palette.action.hover
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    sx={{ 
                      backgroundColor: theme.palette.primary.main,
                      width: 40,
                      height: 40,
                      fontSize: '0.875rem'
                    }}
                  >
                    {call.customerName.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <div className="flex items-center gap-2">
                      <Typography variant="body2" className="font-medium">
                        {call.customerName}
                      </Typography>
                      <Chip 
                        label={getPriorityLabel(call.priority)}
                        size="small"
                        color={getPriorityColor(call.priority) as any}
                        variant="outlined"
                      />
                    </div>
                  }
                  secondary={
                    <div className="flex justify-between items-center mt-1">
                      <Typography variant="caption" color="text.secondary">
                        {call.phone}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        className={`font-mono font-medium ${
                          call.waitTime > 180 ? 'text-red-500' : 
                          call.waitTime > 120 ? 'text-orange-500' : 
                          'text-green-500'
                        }`}
                      >
                        {formatWaitTime(call.waitTime)}
                      </Typography>
                    </div>
                  }
                />
                
                <div className="text-right">
                  <Typography variant="caption" color="text.secondary">
                    #{index + 1}
                  </Typography>
                </div>
              </ListItem>
            ))}
          </List>
        ) : (
          <div className="text-center py-8 mx-6">
            <Typography color="text.secondary">
              Keine wartenden Anrufe
            </Typography>
          </div>
        )}
      </div>
    </Box>
  );
}

export default CallQueueWidget;
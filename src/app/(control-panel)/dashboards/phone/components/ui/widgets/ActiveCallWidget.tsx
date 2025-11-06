import { useTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

interface CustomerData {
  name: string;
  phone: string;
  customerSince: string;
  totalSpent: string;
  lastOrder: string;
  mood: string;
  isVIP: boolean;
}

interface ActiveCallWidgetProps {
  onCallStatusChange?: (status: string) => void;
  onCustomerDataChange?: (data: CustomerData | null) => void;
}

function ActiveCallWidget({ onCallStatusChange, onCustomerDataChange }: ActiveCallWidgetProps) {
  const theme = useTheme();
  const [callStatus, setCallStatus] = useState('idle'); // idle, ringing, active, ended
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Simuliere eingehenden Anruf
  const simulateIncomingCall = () => {
    const mockCustomer: CustomerData = {
      name: 'Ayşe Yılmaz',
      phone: '0-8-315-1992',
      customerSince: '2019',
      totalSpent: '€2,340',
      lastOrder: '15.10.2025',
      mood: 'friendly',
      isVIP: true
    };
    
    setCallStatus('ringing');
    setCustomerData(mockCustomer);
    onCallStatusChange?.('ringing');
    onCustomerDataChange?.(mockCustomer);
  };

  // Anruf annehmen
  const acceptCall = () => {
    setCallStatus('active');
    setCallDuration(0);
    setIsRecording(true);
    startCallTimer();
    onCallStatusChange?.('active');
  };

  // Anruf beenden
  const endCall = () => {
    setCallStatus('ended');
    setIsRecording(false);
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }
    onCallStatusChange?.('ended');
    
    setTimeout(() => {
      setCallStatus('idle');
      setCustomerData(null);
      setCallDuration(0);
      onCallStatusChange?.('idle');
      onCustomerDataChange?.(null);
    }, 2000);
  };

  // Call Timer
  const startCallTimer = () => {
    callTimerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, []);

  const getStatusColor = () => {
    switch (callStatus) {
      case 'ringing': return 'warning';
      case 'active': return 'success';
      case 'ended': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = () => {
    switch (callStatus) {
      case 'idle': return 'Verfügbar';
      case 'ringing': return 'Eingehender Anruf';
      case 'active': return `Aktiver Anruf - ${formatDuration(callDuration)}`;
      case 'ended': return 'Anruf beendet';
      default: return 'Unbekannt';
    }
  };

  return (
    <Box
      className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm"
      sx={{
        background: callStatus === 'ringing' ? 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' : 
                   callStatus === 'active' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' :
                   theme.vars.palette.background.paper,
        color: callStatus === 'ringing' || callStatus === 'active' ? 'white' : theme.vars.palette.text.primary,
        minHeight: 200
      }}
    >
      <div className="mx-6 mt-6 flex justify-between items-start">
        <div className="flex flex-col">
          <Typography className="text-2xl font-bold mb-2">
            Aktuelle Verbindung
          </Typography>
          <Chip 
            label={getStatusText()}
            color={getStatusColor() as any}
            size="small"
            className={callStatus === 'active' ? 'animate-pulse' : ''}
          />
        </div>
        
        <div className="flex gap-2">
          {callStatus === 'idle' && (
            <Button 
              onClick={simulateIncomingCall}
              variant="contained"
              size="small"
              sx={{ 
                backgroundColor: theme.palette.primary.main,
                '&:hover': { backgroundColor: theme.palette.primary.dark }
              }}
            >
              Anruf simulieren
            </Button>
          )}
          
          {callStatus === 'ringing' && (
            <>
              <Button 
                onClick={acceptCall}
                variant="contained"
                color="success"
                size="small"
                className="animate-pulse"
              >
                Annehmen
              </Button>
              <Button 
                onClick={() => {
                  setCallStatus('idle');
                  setCustomerData(null);
                  onCallStatusChange?.('idle');
                  onCustomerDataChange?.(null);
                }}
                variant="contained"
                color="error"
                size="small"
              >
                Ablehnen
              </Button>
            </>
          )}
          
          {callStatus === 'active' && (
            <Button 
              onClick={endCall}
              variant="contained"
              color="error"
              size="small"
            >
              Auflegen
            </Button>
          )}
        </div>
      </div>

      {customerData && (
        <div className="mx-6 mt-4 mb-6">
          <div className="flex items-center gap-4">
            <Avatar
              sx={{ 
                width: 60, 
                height: 60, 
                backgroundColor: theme.palette.secondary.main,
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              {customerData.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Typography variant="h6" className="font-bold">
                  {customerData.name}
                </Typography>
                {customerData.isVIP && (
                  <Chip 
                    label="VIP" 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#FCD34D',
                      color: '#92400E',
                      fontWeight: 'bold'
                    }}
                  />
                )}
              </div>
              <Typography variant="body2" className="opacity-90">
                {customerData.phone}
              </Typography>
              <Typography variant="caption" className="opacity-75">
                Kunde seit {customerData.customerSince} | {customerData.totalSpent}
              </Typography>
            </div>

            {callStatus === 'active' && (
              <div className="text-right">
                {isRecording && (
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <Typography variant="caption">Aufzeichnung</Typography>
                  </div>
                )}
                <Typography variant="body2" className="font-mono">
                  {formatDuration(callDuration)}
                </Typography>
              </div>
            )}
          </div>

          {callStatus === 'active' && (
            <div className="flex gap-2 mt-4">
              <IconButton size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                ⏸️
              </IconButton>
              <IconButton size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                📧
              </IconButton>
              <IconButton size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                📝
              </IconButton>
            </div>
          )}
        </div>
      )}

      {callStatus === 'idle' && !customerData && (
        <div className="mx-6 mb-6 text-center py-8">
          <Typography color="text.secondary">
            Bereit für eingehende Anrufe
          </Typography>
        </div>
      )}
    </Box>
  );
}

export default ActiveCallWidget;
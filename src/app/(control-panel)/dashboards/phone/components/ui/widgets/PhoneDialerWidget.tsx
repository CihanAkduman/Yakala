'use client';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

interface PhoneDialerWidgetProps {
  onCall?: (number: string, type: 'domestic' | 'international') => void;
}

function PhoneDialerWidget({ onCall }: PhoneDialerWidgetProps) {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callType, setCallType] = useState<'domestic' | 'international'>('domestic');
  const [isInCall, setIsInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Mock call data
  const callInfo = {
    callerId: '88554',
    aht: '3:50',
    callerName: 'Abdi Yayla',
    callerNumber: '+90 532 123 45 67'
  };

  // Numpad buttons - smaller and right-aligned
  const numpadButtons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInCall]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNumberClick = (digit: string) => {
    if (phoneNumber.length < 20) {
      setPhoneNumber(prev => prev + digit);
    }
  };

  const handleDelete = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPhoneNumber('');
  };

  const handleCall = () => {
    if (phoneNumber.trim()) {
      setIsInCall(true);
      setCallDuration(0);
      if (onCall) {
        onCall(phoneNumber, callType);
      }
    }
  };

  const handleHangup = () => {
    setIsInCall(false);
    setCallDuration(0);
    setPhoneNumber('');
  };

  const handlePaymentRedirect = () => {
    // Simulate payment system redirect
    console.log('Redirecting to payment system...');
  };

  const formatPhoneNumber = (number: string) => {
    if (callType === 'domestic') {
      const cleaned = number.replace(/\D/g, '');
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      if (cleaned.length <= 8) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
    } else {
      const cleaned = number.replace(/\D/g, '');
      return cleaned.replace(/(\d{3})/g, '$1 ').trim();
    }
  };

  const getCallTypeConfig = () => {
    return {
      domestic: {
        prefix: '+90',
        label: 'Yurtiçi',
        icon: 'lucide:map-pin',
        color: theme.palette.primary.main
      },
      international: {
        prefix: '+',
        label: 'Yurtdışı',
        icon: 'lucide:globe',
        color: theme.palette.secondary.main
      }
    };
  };

  const config = getCallTypeConfig();
  const currentConfig = config[callType];

  return (
    <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
      <div className="flex flex-col items-start justify-between sm:flex-row mb-4">
        <Typography className="truncate text-xl leading-6 font-medium tracking-tight">
          Telefon
        </Typography>
        <div className="flex gap-2">
          {isInCall && (
            <Chip 
              label={`Konuşma Süresi: ${formatDuration(callDuration)}`}
              size="small"
              color="success"
              variant="filled"
              icon={<FuseSvgIcon size={12}>lucide:clock</FuseSvgIcon>}
            />
          )}
          <Chip 
            label={`AHT: ${callInfo.aht}`}
            size="small"
            variant="outlined"
            color="info"
          />
        </div>
      </div>

      {/* Active Call Info */}
      {isInCall && (
        <Alert severity="success" className="mb-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Typography variant="body2" className="font-medium">
                Aktif Arama - ID: {callInfo.callerId}  
              </Typography>
              <Typography variant="body2" className="font-mono">
                 {formatDuration(callDuration)}
              </Typography>
            </div>
            <Typography variant="caption" color="text.secondary">
              {callInfo.callerName} • {callInfo.callerNumber}
            </Typography>
          </div>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side - Call Controls */}
        <div>
          {/* Call Type Selection */}
          <Box className="mb-4">
            <Typography variant="body2" className="font-medium mb-2" color="text.secondary">
              Arama Türü
            </Typography>
            
            <ToggleButtonGroup
              value={callType}
              exclusive
              onChange={(_, newType) => newType && setCallType(newType)}
              className="w-full"
              disabled={isInCall}
            >
              <ToggleButton value="domestic" className="flex-1">
                <FuseSvgIcon size={14} className="mr-1">lucide:map-pin</FuseSvgIcon>
                Yurtiçi
              </ToggleButton>
              <ToggleButton value="international" className="flex-1">
                <FuseSvgIcon size={14} className="mr-1">lucide:globe</FuseSvgIcon>
                Yurtdışı
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Phone Number Display */}
          <Box className="mb-4">
            <TextField
              fullWidth
              variant="outlined"
              value={phoneNumber ? `${currentConfig.prefix} ${formatPhoneNumber(phoneNumber)}` : ''}
              placeholder={`${currentConfig.prefix} Numara girin`}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: '1.1rem',
                  fontFamily: 'monospace'
                }
              }}
              disabled={isInCall}
            />
          </Box>

          {/* Main Action Buttons */}
          <Box className="flex gap-2 mb-4">
                          {!isInCall ? (
              <Button
                variant="contained"
                size="large"
                onClick={handleCall}
                disabled={!phoneNumber.trim()}
                startIcon={<FuseSvgIcon>lucide:phone</FuseSvgIcon>}
                sx={{
                  flex: 1,
                  minHeight: '48px',
                  backgroundColor: theme.palette.success.main,
                  '&:hover': {
                    backgroundColor: theme.palette.success.dark
                  }
                }}
              >
                Ara
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={handleHangup}
                startIcon={<FuseSvgIcon>lucide:phone-off</FuseSvgIcon>}
                sx={{
                  flex: 1,
                  minHeight: '48px',
                  backgroundColor: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: theme.palette.error.dark
                  }
                }}
              >
                Kapat
              </Button>
            )}
          </Box>

          {/* Call Actions */}
          {isInCall && (
            <Box className="mb-4">
              <Button
                variant="outlined"
                fullWidth
                onClick={handlePaymentRedirect}
                startIcon={<FuseSvgIcon>lucide:credit-card</FuseSvgIcon>}
                sx={{ mb: 2 }}
              >
                Ödeme Sistemine Yönlendir
              </Button>
            </Box>
          )}

          {/* Control Buttons */}
          <Box className="flex gap-2">
            <Button
              variant="outlined"
              onClick={handleDelete}
              disabled={!phoneNumber || isInCall}
              startIcon={<FuseSvgIcon size={14}>lucide:delete</FuseSvgIcon>}
              className="flex-1"
              size="small"
            >
              Sil
            </Button>
            <Button
              variant="outlined"
              onClick={handleClear}
              disabled={!phoneNumber || isInCall}
              startIcon={<FuseSvgIcon size={14}>lucide:x</FuseSvgIcon>}
              className="flex-1"
              size="small"
            >
              Temizle
            </Button>
          </Box>
        </div>

        {/* Right Side - Numpad */}
        <div>
          <Typography variant="body2" className="font-medium mb-2" color="text.secondary">
            Numpad
          </Typography>
          
          <div className="grid grid-cols-3 gap-3">
            {numpadButtons.flat().map((digit) => (
              <Button
                key={digit}
                variant="outlined"
                onClick={() => handleNumberClick(digit)}
                disabled={isInCall}
                sx={{
                  minHeight: '18px',
                  minWidth: '18px',
                  fontSize: '1.6rem',
                  fontWeight: 'bold',
                  aspectRatio: '1/1',
                  borderRadius: '8px'
                }}
              >
                {digit}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Call Statistics */}
      <Divider sx={{ my: 3 }} />
      <Box>
        <Typography variant="body2" className="font-medium mb-2" color="text.secondary">
          Arama İstatistikleri
        </Typography>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <Typography variant="h6" className="font-bold text-blue-600">
              {callInfo.aht}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              AHT
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-bold text-green-600">
              {isInCall ? formatDuration(callDuration) : '0:00'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Şu Anki
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-bold text-purple-600">
              {callInfo.callerId}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Agent ID
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-bold text-orange-600">
              {isInCall ? 'Aktif' : 'Hazır'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Durum
            </Typography>
          </div>
        </div>
      </Box>
    </Paper>
  );
}

export default memo(PhoneDialerWidget);
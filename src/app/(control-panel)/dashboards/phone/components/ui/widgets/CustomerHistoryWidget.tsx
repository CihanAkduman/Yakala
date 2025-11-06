'use client';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

interface FlightHistoryItem {
  id: string;
  type: 'booking' | 'rebooking' | 'seat_reservation' | 'baggage_issue' | 'checkin' | 'cancellation' | 'upgrade' | 'meal_selection';
  title: string;
  description: string;
  date: string;
  flightNumber?: string;
  amount?: string;
  status: 'completed' | 'resolved' | 'pending' | 'cancelled' | 'confirmed';
}

interface PassengerHistoryWidgetProps {
  passengerId?: string;
}

function PassengerHistoryWidget({ passengerId }: PassengerHistoryWidgetProps) {
  const theme = useTheme();

  // Mock flight history data
  const historyItems: FlightHistoryItem[] = [
    {
      id: '1',
      type: 'booking',
      title: 'Uçuş Rezervasyonu',
      description: 'Antalya - Münih gidiş-dönüş',
      date: '18.10.2025',
      flightNumber: 'XQ131',
      amount: '€1.250',
      status: 'confirmed'
    },
    {
      id: '2',
      type: 'seat_reservation',
      title: 'Koltuk Rezervasyonu',
      description: 'Pencere kenarı koltuk seçildi (12A)',
      date: '16.10.2025',
      flightNumber: 'XQ101',
      amount: '€45',
      status: 'completed'
    },
    {
      id: '3',
      type: 'meal_selection',
      title: 'Özel Yemek Seçimi',
      description: 'Vejeteryan menü seçildi',
      date: '15.10.2025',
      flightNumber: 'XQQ101',
      status: 'confirmed'
    },
    {
      id: '4',
      type: 'upgrade',
      title: 'Sınıf Yükseltme',
      description: 'Business Class\'a yükseltildi',
      date: '12.10.2025',
      flightNumber: 'XQ855',
      amount: '€420',
      status: 'completed'
    },
    {
      id: '5',
      type: 'baggage_issue',
      title: 'Bagaj Hasarı Bildirimi',
      description: 'Valiz hasarı için tazminat talebi',
      date: '08.10.2025',
      flightNumber: 'XQ855',
      amount: '€180',
      status: 'resolved'
    },
    {
      id: '6',
      type: 'rebooking',
      title: 'Uçuş Değişikliği',
      description: 'Tarih değişikliği yapıldı',
      date: '05.10.2025',
      flightNumber: 'XQ123',
      amount: '€75',
      status: 'completed'
    },
    {
      id: '7',
      type: 'checkin',
      title: 'Online Check-in',
      description: 'Boarding pass alındı',
      date: '03.10.2025',
      flightNumber: 'XQ456',
      status: 'completed'
    }
  ];

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'booking':
        return {
          icon: 'lucide:plane',
          color: theme.palette.primary.main,
          bgColor: theme.palette.primary.light + '20',
          label: 'Rezervasyon'
        };
      case 'rebooking':
        return {
          icon: 'lucide:calendar-check',
          color: theme.palette.warning.main,
          bgColor: theme.palette.warning.light + '20',
          label: 'Değişiklik'
        };
      case 'seat_reservation':
        return {
          icon: 'lucide:armchair',
          color: theme.palette.info.main,
          bgColor: theme.palette.info.light + '20',
          label: 'Koltuk'
        };
      case 'baggage_issue':
        return {
          icon: 'lucide:luggage',
          color: theme.palette.error.main,
          bgColor: theme.palette.error.light + '20',
          label: 'Bagaj Sorunu'
        };
      case 'checkin':
        return {
          icon: 'lucide:check-circle',
          color: theme.palette.success.main,
          bgColor: theme.palette.success.light + '20',
          label: 'Check-in'
        };
      case 'cancellation':
        return {
          icon: 'lucide:x-circle',
          color: theme.palette.error.main,
          bgColor: theme.palette.error.light + '20',
          label: 'İptal'
        };
      case 'upgrade':
        return {
          icon: 'lucide:crown',
          color: '#ab9624',
          bgColor: '#FFF8DC',
          label: 'Upgrade'
        };
      case 'meal_selection':
        return {
          icon: 'lucide:utensils',
          color: theme.palette.secondary.main,
          bgColor: theme.palette.secondary.light + '20',
          label: 'Yemek'
        };
      default:
        return {
          icon: 'lucide:circle',
          color: theme.palette.grey[500],
          bgColor: theme.palette.grey[100],
          label: 'Diğer'
        };
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'completed':
        return <Chip label="Tamamlandı" size="small" color="success" variant="outlined" />;
      case 'confirmed':
        return <Chip label="Onaylandı" size="small" color="primary" variant="outlined" />;
      case 'resolved':
        return <Chip label="Çözüldü" size="small" color="info" variant="outlined" />;
      case 'pending':
        return <Chip label="Beklemede" size="small" color="warning" variant="outlined" />;
      case 'cancelled':
        return <Chip label="İptal" size="small" color="error" variant="outlined" />;
      default:
        return <Chip label="Bilinmiyor" size="small" variant="outlined" />;
    }
  };

  return (
    <Paper 
      className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm w-full max-w-full"
      sx={{ 
        width: '100% !important',
        maxWidth: 'none !important',
        margin: 0,
        height: 'fit-content'
      }}
    >
      <div className="flex flex-col items-start justify-between sm:flex-row mb-4">
        <Typography className="truncate text-xl leading-6 font-medium tracking-tight">
          Uçuş Geçmişi
        </Typography>
        <Chip 
          label={`${historyItems.length} İşlem`}
          size="small"
          variant="outlined"
          color="primary"
        />
      </div>

      <Typography
        className="font-medium mb-4"
        color="text.secondary"
        variant="body2"
      >
        Son uçuş aktiviteleri ve işlemler
      </Typography>

      {/* Flight History Timeline */}
      <div className="flex-1 overflow-auto max-h-80">
        <List className="p-0">
          {historyItems.map((item, index) => {
            const typeConfig = getTypeConfig(item.type);
            
            return (
              <div key={item.id}>
                <ListItem className="px-0 py-3">
                  <div className="flex items-start gap-3 w-full">
                    {/* Icon */}
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ 
                        backgroundColor: typeConfig.bgColor,
                        border: `1px solid ${typeConfig.color}30`
                      }}
                    >
                      <FuseSvgIcon 
                        size={16}
                        sx={{ color: typeConfig.color }}
                      >
                        {typeConfig.icon}
                      </FuseSvgIcon>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Typography variant="body2" className="font-medium">
                            {item.title}
                          </Typography>
                          {item.flightNumber && (
                            <Chip 
                              label={item.flightNumber} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: '0.7rem', height: '20px' }}
                            />
                          )}
                        </div>
                        {item.amount && (
                          <Typography variant="body2" className="font-bold text-blue-600">
                            {item.amount}
                          </Typography>
                        )}
                      </div>
                      
                      <Typography variant="caption" color="text.secondary" className="block mb-2">
                        {item.description}
                      </Typography>
                      
                      <div className="flex items-center justify-between">
                        <Typography variant="caption" color="text.secondary">
                          {item.date}
                        </Typography>
                        {getStatusChip(item.status)}
                      </div>
                    </div>
                  </div>
                </ListItem>
                
                {index < historyItems.length - 1 && (
                  <Divider variant="inset" component="li" sx={{ ml: 6 }} />
                )}
              </div>
            );
          })}
        </List>
      </div>

      {/* Summary Footer */}
      <Box 
        sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
        className="mt-4 p-3 rounded-xl border"
      >
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <Typography variant="h6" className="font-bold text-blue-600">
              {historyItems.filter(item => item.type === 'booking').length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Rezervasyon
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-bold text-orange-600">
              {historyItems.filter(item => item.type === 'rebooking').length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Değişiklik
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-bold text-red-600">
              {historyItems.filter(item => item.type === 'baggage_issue').length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Bagaj
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-bold text-green-600">
              {historyItems.filter(item => item.type === 'checkin').length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Check-in
            </Typography>
          </div>
        </div>
      </Box>
    </Paper>
  );
}

export default memo(PassengerHistoryWidget);
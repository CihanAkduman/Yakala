import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

interface HistoryItem {
  id: string;
  type: 'purchase' | 'support' | 'complaint' | 'visit';
  title: string;
  description: string;
  date: string;
  amount?: string;
  status: 'completed' | 'resolved' | 'pending' | 'cancelled';
}

interface CustomerHistoryWidgetProps {
  customerId?: string;
}

function CustomerHistoryWidget({ customerId }: CustomerHistoryWidgetProps) {
  const theme = useTheme();

  // Mock history data
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'purchase',
      title: 'Premium Yazılım Lisansı',
      description: 'Yıllık abonelik satın alındı',
      date: '15.10.2025',
      amount: '₺2.499',
      status: 'completed'
    },
    {
      id: '2',
      type: 'support',
      title: 'Teknik Destek Talebi',
      description: 'Giriş sorunu çözüldü',
      date: '12.10.2025',
      status: 'resolved'
    },
    {
      id: '3',
      type: 'purchase',
      title: 'Ek Modül Paketi',
      description: 'Analytics modülü eklendi',
      date: '28.09.2025',
      amount: '₺750',
      status: 'completed'
    },
    {
      id: '4',
      type: 'visit',
      title: 'Web Sitesi Ziyareti',
      description: 'Ürün sayfalarını inceledi',
      date: '25.09.2025',
      status: 'completed'
    },
    {
      id: '5',
      type: 'support',
      title: 'Kullanım Eğitimi',
      description: 'Online eğitim oturumu tamamlandı',
      date: '20.09.2025',
      status: 'resolved'
    }
  ];

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'purchase':
        return {
          icon: 'lucide:shopping-cart',
          color: theme.palette.success.main,
          bgColor: theme.palette.success.light + '20',
          label: 'Satın Alma'
        };
      case 'support':
        return {
          icon: 'lucide:headphones',
          color: theme.palette.info.main,
          bgColor: theme.palette.info.light + '20',
          label: 'Destek'
        };
      case 'complaint':
        return {
          icon: 'lucide:alert-circle',
          color: theme.palette.error.main,
          bgColor: theme.palette.error.light + '20',
          label: 'Şikayet'
        };
      case 'visit':
        return {
          icon: 'lucide:mouse-pointer-click',
          color: theme.palette.secondary.main,
          bgColor: theme.palette.secondary.light + '20',
          label: 'Ziyaret'
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
          Müşteri Geçmişi
        </Typography>
        <Chip 
          label={`${historyItems.length} Kayıt`}
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
        Son aktiviteler ve işlemler
      </Typography>

      {/* History Timeline */}
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
                        <Typography variant="body2" className="font-medium">
                          {item.title}
                        </Typography>
                        {item.amount && (
                          <Typography variant="body2" className="font-bold text-green-600">
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
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Typography variant="h6" className="font-bold text-green-600">
              {historyItems.filter(item => item.type === 'purchase').length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Satın Alma
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-bold text-blue-600">
              {historyItems.filter(item => item.type === 'support').length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Destek
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-bold text-purple-600">
              {historyItems.filter(item => item.type === 'visit').length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ziyaret
            </Typography>
          </div>
        </div>
      </Box>
    </Paper>
  );
}

export default memo(CustomerHistoryWidget);
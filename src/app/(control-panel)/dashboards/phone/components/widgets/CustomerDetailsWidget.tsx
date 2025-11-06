'use client';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

interface CustomerData {
  firstName: string;
  lastName: string;
  phone: string;
  mobile: string;
  email: string;
  gender: 'male' | 'female';
  loyaltyNumber: string;
  membershipLevel: 'gold' | 'silver' | 'bronze';
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

interface CustomerDetailsWidgetProps {
  customer?: CustomerData | null;
}

function CustomerDetailsWidget({ customer }: CustomerDetailsWidgetProps) {
  const theme = useTheme();

  // Mock customer data
  const mockCustomer: CustomerData = {
    firstName: 'Ayşe',
    lastName: 'Yılmaz',
    phone: '+90 212 555 12 34',
    mobile: '+90 532 123 45 67',
    email: 'ayse.yilmaz@email.com',
    gender: 'female',
    loyaltyNumber: 'XQ9456123',
    membershipLevel: 'gold',
    address: {
      street: 'Bağdat Caddesi No: 125/A',
      city: 'İstanbul',
      zipCode: '34740',
      country: 'Türkiye'
    }
  };

  const displayCustomer = customer || mockCustomer;

  const getGenderIcon = (gender: string) => {
    return gender === 'male' ? 'lucide:user' : 'lucide:user-round';
  };

  const getGenderColor = (gender: string) => {
    return gender === 'male' ? theme.palette.info.main : theme.palette.secondary.main;
  };

  const getMembershipConfig = (level: string) => {
    switch (level) {
      case 'gold':
        return {
          label: 'Gold Üye',
          color: '#ab9624',
          bgColor: '#FFF8DC',
          icon: 'lucide:crown'
        };
      case 'silver':
        return {
          label: 'Silver Üye',
          color: '#C0C0C0',
          bgColor: '#F8F8FF',
          icon: 'lucide:award'
        };
      case 'bronze':
        return {
          label: 'Bronze Üye',
          color: '#CD7F32',
          bgColor: '#FDF5E6',
          icon: 'lucide:medal'
        };
      default:
        return {
          label: 'Standart Üye',
          color: theme.palette.grey[500],
          bgColor: theme.palette.grey[50],
          icon: 'lucide:user-circle'
        };
    }
  };

  const membershipConfig = getMembershipConfig(displayCustomer.membershipLevel);

  return (
    <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
      <div className="flex flex-col items-start justify-between sm:flex-row">
        <Typography className="truncate text-xl leading-6 font-medium tracking-tight">
          Müşteri Detayları
        </Typography>
        <Chip 
          label={membershipConfig.label}
          size="small"
          sx={{ 
            backgroundColor: membershipConfig.bgColor,
            color: membershipConfig.color,
            fontWeight: 'bold',
            border: `1px solid ${membershipConfig.color}30`
          }}
        />
      </div>

      <div className="mt-8 grid w-full grid-flow-row grid-cols-1 gap-6 sm:mt-4 lg:grid-cols-2">
        
        {/* Sol Taraf - Gender Icon ve Ad */}
        <div className="flex flex-auto flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: `${getGenderColor(displayCustomer.gender)}15`,
                border: `2px solid ${getGenderColor(displayCustomer.gender)}30`
              }}
            >
              <FuseSvgIcon 
                size={24}
                sx={{ color: getGenderColor(displayCustomer.gender) }}
              >
                {getGenderIcon(displayCustomer.gender)}
              </FuseSvgIcon>
            </div>
            <div>
              <Typography variant="h5" className="font-bold">
                {displayCustomer.firstName} {displayCustomer.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {displayCustomer.gender === 'male' ? 'Erkek' : 'Kadın'}
              </Typography>
            </div>
          </div>
          
          {/* Membership Status with Address */}
          <Box 
            sx={{ 
              backgroundColor: membershipConfig.bgColor,
              borderColor: `${membershipConfig.color}30`
            }}
            className="p-4 rounded-xl border"
          >
            <div className="flex items-start gap-3 mb-4">
              <FuseSvgIcon sx={{ color: membershipConfig.color, mt: 0.5 }}>
                {membershipConfig.icon}
              </FuseSvgIcon>
              <div className="flex-1">
                <Typography 
                  variant="body2" 
                  className="font-semibold mb-2"
                  sx={{ color: membershipConfig.color }}
                >
                  {membershipConfig.label}
                </Typography>
                <Typography 
                  variant="h6" 
                  className="font-bold mb-3 tracking-wider"
                  sx={{ color: membershipConfig.color }}
                >
                  {displayCustomer.loyaltyNumber}
                </Typography>
              </div>
            </div>
            
            {/* Address Information */}
            <div className="flex items-start gap-3">
              <FuseSvgIcon size={16} sx={{ color: membershipConfig.color, mt: 0.5 }}>
                lucide:map-pin
              </FuseSvgIcon>
              <div className="flex-1">
                <Typography variant="body2" className="font-medium mb-1">
                  {displayCustomer.address.street}
                </Typography>
                <Typography variant="body2" className="mb-1">
                  {displayCustomer.address.city}, {displayCustomer.address.zipCode}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {displayCustomer.address.country}
                </Typography>
              </div>
            </div>
          </Box>
        </div>

        {/* Sağ Taraf - İletişim Detayları */}
        <div className="flex flex-col">
          <Typography
            className="font-medium mb-6"
            color="text.secondary"
          >
            İletişim Bilgileri
          </Typography>
          
          <div className="grid flex-auto grid-cols-1 gap-3">
            
            {/* Telefon */}
            <Box
              sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
            >
              <FuseSvgIcon size={16} color="action">lucide:phone</FuseSvgIcon>
              <div className="flex-1">
                <Typography variant="caption" color="text.secondary" className="block">
                  Telefon
                </Typography>
                <Typography variant="body2" className="font-medium">
                  {displayCustomer.phone}
                </Typography>
              </div>
            </Box>

            {/* Mobil */}
            <Box
              sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
            >
              <FuseSvgIcon size={16} color="action">lucide:smartphone</FuseSvgIcon>
              <div className="flex-1">
                <Typography variant="caption" color="text.secondary" className="block">
                  Mobil
                </Typography>
                <Typography variant="body2" className="font-medium">
                  {displayCustomer.mobile}
                </Typography>
              </div>
            </Box>

            {/* E-posta */}
            <Box
              sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
            >
              <FuseSvgIcon size={16} color="action">lucide:mail</FuseSvgIcon>
              <div className="flex-1">
                <Typography variant="caption" color="text.secondary" className="block">
                  E-posta
                </Typography>
                <Typography variant="body2" className="font-medium">
                  {displayCustomer.email}
                </Typography>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(CustomerDetailsWidget);
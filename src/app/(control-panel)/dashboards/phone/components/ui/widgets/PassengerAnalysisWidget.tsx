'use client';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

interface VoiceAnalysis {
  emotion: 'happy' | 'neutral' | 'frustrated' | 'angry' | 'sad';
  stressLevel: number; // 0-100
  confidence: number; // 0-100
  lastAnalyzed: string;
}

interface BehaviorPattern {
  type: 'purchase_intent' | 'complaint_risk' | 'loyalty_opportunity' | 'assistance_needed';
  confidence: number;
  description: string;
  suggestedActions: string[];
}

interface SmartRecommendation {
  id: string;
  type: 'upsell' | 'service' | 'proactive_support' | 'retention';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  expectedRevenue?: string;
  actionRequired: boolean;
}

interface PassengerAnalysisWidgetProps {
  passengerId?: string;
}

function PassengerAnalysisWidget({ passengerId }: PassengerAnalysisWidgetProps) {
  const theme = useTheme();

  // Mock AI analysis data
  const voiceAnalysis: VoiceAnalysis = {
    emotion: 'frustrated',
    stressLevel: 75,
    confidence: 92,
    lastAnalyzed: '20:34'
  };

  const behaviorPatterns: BehaviorPattern[] = [
    {
      type: 'complaint_risk',
      confidence: 84,
      description: 'Bagaj sorunu nedeniyle memnuniyetsizlik belirtileri',
      suggestedActions: ['Proaktif iletişim kur', 'Tazminat süreçleri', 'Yardımcı ol']
    },
    {
      type: 'purchase_intent',
      confidence: 67,
      description: 'Bundle yükseltme ilgisi gösteriyor',
      suggestedActions: ['SunCompfort teklif et', 'Lounge erişimi ekle', 'Loyality kazanım vurgula']
    }
  ];

  const smartRecommendations: SmartRecommendation[] = [
    {
      id: '1',
      type: 'proactive_support',
      title: 'Müdahale Gerekli',
      description: 'Hasarlı Bagaj için WebForm oluştur yada yönlendir',
      priority: 'high',
      actionRequired: true
    },
    {
      id: '2',
      type: 'upsell',
      title: 'SunPriority Upgrade',
      description: 'Mevcut stresin azaltılması için upgrade önerisi',
      priority: 'medium',
      expectedRevenue: '€12,99',
      actionRequired: false
    },
    {
      id: '3',
      type: 'service',
      title: 'Premium Bagaj Sigortası',
      description: 'Gelecekteki seyahatler için tazminat 400,-€',
      priority: 'low',
      expectedRevenue: '€4,99',
      actionRequired: false
    },
    {
      id: '4',
      type: 'retention',
      title: 'Loyalty Program ',
      description: 'Puan eklentisi',
      priority: 'medium',
      expectedRevenue: '€1,60',
      actionRequired: false
    }
  ];

  const getEmotionConfig = (emotion: string) => {
    switch (emotion) {
      case 'happy':
        return {
          icon: 'lucide:smile',
          color: theme.palette.success.main,
          bgColor: theme.palette.success.light + '20',
          label: 'Mutlu',
          description: 'Pozitif ruh hali tespit edildi'
        };
      case 'neutral':
        return {
          icon: 'lucide:meh',
          color: theme.palette.info.main,
          bgColor: theme.palette.info.light + '20',
          label: 'Nötr',
          description: 'Dengeli ruh hali'
        };
      case 'frustrated':
        return {
          icon: 'lucide:frown',
          color: theme.palette.warning.main,
          bgColor: theme.palette.warning.light + '20',
          label: 'Sinirli',
          description: 'Hayal kırıklığı belirtileri'
        };
      case 'angry':
        return {
          icon: 'lucide:angry',
          color: theme.palette.error.main,
          bgColor: theme.palette.error.light + '20',
          label: 'Öfkeli',
          description: 'Yüksek stres seviyesi'
        };
      case 'sad':
        return {
          icon: 'lucide:frown',
          color: theme.palette.error.main,
          bgColor: theme.palette.error.light + '20',
          label: 'Üzgün',
          description: 'Moral düşüklüğü'
        };
      default:
        return {
          icon: 'lucide:help-circle',
          color: theme.palette.grey[500],
          bgColor: theme.palette.grey[100],
          label: 'Bilinmiyor',
          description: 'Analiz edilemiyor'
        };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { color: 'error', label: 'Yüksek' };
      case 'medium':
        return { color: 'warning', label: 'Orta' };
      case 'low':
        return { color: 'info', label: 'Düşük' };
      default:
        return { color: 'default', label: 'Normal' };
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'upsell':
        return 'lucide:trending-up';
      case 'service':
        return 'lucide:shield-check';
      case 'proactive_support':
        return 'lucide:alert-triangle';
      case 'retention':
        return 'lucide:heart';
      default:
        return 'lucide:lightbulb';
    }
  };

  const emotionConfig = getEmotionConfig(voiceAnalysis.emotion);

  return (
    <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
      <div className="flex flex-col items-start justify-between sm:flex-row mb-4">
        <Typography className="truncate text-xl leading-6 font-medium tracking-tight">
          SensEI Yolcu Analizi
        </Typography>
        <div className="flex gap-2">
          <Chip 
            label="Live"
            size="small"
            color="success"
            variant="filled"
            icon={<FuseSvgIcon size={12}>lucide:radio</FuseSvgIcon>}
          />
          <Chip 
            label={`Son: ${voiceAnalysis.lastAnalyzed}`}
            size="small"
            variant="outlined"
          />
        </div>
      </div>

      {/* Voice Analysis Section */}
      <Box className="mb-6">
        <Typography variant="body2" className="font-medium mb-3" color="text.secondary">
          Ses Tonu Analizi
        </Typography>
        
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: emotionConfig.bgColor,
              border: `2px solid ${emotionConfig.color}30`
            }}
          >
            <FuseSvgIcon 
              size={20}
              sx={{ color: emotionConfig.color }}
            >
              {emotionConfig.icon}
            </FuseSvgIcon>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Typography variant="body2" className="font-semibold">
                {emotionConfig.label}
              </Typography>
              <Chip 
                label={`${voiceAnalysis.confidence}% Güvenilirlik`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem', height: '22px' }}
              />
            </div>
            <Typography variant="caption" color="text.secondary">
              {emotionConfig.description}
            </Typography>
          </div>
        </div>

        {/* Stress Level */}
        <Box className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Typography variant="caption" color="text.secondary">
              Stres Seviyesi
            </Typography>
            <Typography variant="caption" className="font-medium">
              {voiceAnalysis.stressLevel}%
            </Typography>
          </div>
          <LinearProgress 
            variant="determinate" 
            value={voiceAnalysis.stressLevel}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.palette.grey[200],
              '& .MuiLinearProgress-bar': {
                backgroundColor: voiceAnalysis.stressLevel > 70 ? theme.palette.error.main :
                                voiceAnalysis.stressLevel > 40 ? theme.palette.warning.main :
                                theme.palette.success.main
              }
            }}
          />
        </Box>
      </Box>

      {/* Smart Recommendations */}
      <Box className="mb-6">
        <Typography variant="body2" className="font-medium mb-3" color="text.secondary">
          SensEI Önerileri
        </Typography>
        
        <div className="space-y-3">
          {smartRecommendations.map((recommendation) => {
            const priorityConfig = getPriorityConfig(recommendation.priority);
            
            return (
              <Alert
                key={recommendation.id}
                severity={priorityConfig.color as any}
                variant="outlined"
                action={
                  recommendation.actionRequired && (
                    <Button 
                      size="small" 
                      variant="contained"
                      color={priorityConfig.color as any}
                    >
                      Harekete Geç
                    </Button>
                  )
                }
                icon={
                  <FuseSvgIcon size={16}>
                    {getRecommendationIcon(recommendation.type)}
                  </FuseSvgIcon>
                }
              >
                <div>
<Typography variant="body2" className="font-medium mb-1" component="div">
    {recommendation.title}
    {recommendation.expectedRevenue && (
        <Chip 
            label={recommendation.expectedRevenue}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ ml: 1, fontSize: '0.7rem', height: '20px' }}
                      />
                    )}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {recommendation.description}
                  </Typography>
                </div>
              </Alert>
            );
          })}
        </div>
      </Box>

      {/* Behavior Patterns */}
      <Box>
        <Typography variant="body2" className="font-medium mb-3" color="text.secondary">
          Davranış Analizi
        </Typography>
        
        <div className="space-y-4">
          {behaviorPatterns.map((pattern, index) => (
            <Box
              key={index}
              sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
              className="p-4 rounded-xl border"
            >
              <div className="flex justify-between items-start mb-2">
                <Typography variant="body2" className="font-medium">
                  {pattern.description}
                </Typography>
                <Chip 
                  label={`${pattern.confidence}%`}
                  size="small"
                  color={pattern.confidence > 80 ? 'success' : pattern.confidence > 60 ? 'warning' : 'default'}
                  variant="filled"
                />
              </div>
              
              <Typography variant="caption" color="text.secondary" className="block mb-3">
                Önerilen Aksiyonlar:
              </Typography>
              
              <div className="flex flex-wrap gap-1">
                {pattern.suggestedActions.map((action, actionIndex) => (
                  <Chip
                    key={actionIndex}
                    label={action}
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ fontSize: '0.7rem' }}
                  />
                ))}
              </div>
            </Box>
          ))}
        </div>
      </Box>
    </Paper>
  );
}

export default memo(PassengerAnalysisWidget);
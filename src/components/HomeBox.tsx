"use client";

import { Box, Typography } from "@mui/material";

interface HomeBoxProps {
  title: string;
  description: string;
  image: string;
}

export default function HomeBox({ title, description, image }: HomeBoxProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: '100%', sm: '350px' },
        borderRadius: '50px',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.25) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        p: '12px 20px',
        color: '#fff',
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
          borderRadius: '24px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.21) 100%)',
          '& .expandable-content': {
            gridTemplateRows: '1fr',
          },
          '& .inner-content': {
            opacity: 1,
            transitionDelay: '0.1s',
          }
        }
      }}
    >
      <Box
        component="img"
        src="/Assets/HomeAnimateBox.svg"
        alt="decoration"
        sx={{
          position: 'absolute',
          top: '-18px',
          left: '-22px',
          width: '36px',
          height: '36px',
          zIndex: 2,
          pointerEvents: 'none',
          transition: 'transform 0.5s ease',
          '.MuiBox-root:hover > &': {
            transform: 'scale(1.1) rotate(-5deg)',
          }
        }}
      />

      <Typography 
        variant="h6" 
        sx={{ 
            fontWeight: 500, 
            fontSize: { xs: '1.1rem', sm: '1.4rem' },
            lineHeight: 1
        }}
      >
        {title}
      </Typography>

      <Box
        className="expandable-content"
        sx={{
          display: 'grid',
          gridTemplateRows: '0fr',
          transition: 'grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          <Box
            className="inner-content"
            sx={{
              opacity: 0,
              transformOrigin: 'top',
              transition: 'opacity 0.4s ease',
              pt: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '0.95rem', lineHeight: 1.3 }}>
              {description}
            </Typography>

            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                width: '100%',
                height: { xs: '140px', sm: '85px' },
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            
            <Box sx={{ height: '2px' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

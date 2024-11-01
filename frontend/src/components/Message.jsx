import { Box } from "@mui/material";

const MyMessage = ({ text }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#69C9AB',
        color: '#FFFFFF',
        width: 'fit-content',
        maxWidth: '90%',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: '500',
        textAlign: 'center',
        zIndex: 1000,
        animation: 'fadeInOut 3s ease-in-out'
      }}
    >
      {text}
    </Box>
  );
};

export default MyMessage;
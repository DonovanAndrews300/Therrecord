import React from 'react';
import { Button, Text } from 'react-native-paper';
import { ButtonProps } from "react-native-paper";

interface Props extends ButtonProps {
    text: string;
}

export default function TextButton({text,... props}:Props) {
    
  return (
    <Button
      {...props}
    >
      <Text theme={{colors:{onSurface:'#ffffff'}}}>{text}</Text>
    </Button>
  );
}
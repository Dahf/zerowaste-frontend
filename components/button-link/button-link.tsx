import { Button, ButtonProps } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { LinkProps } from 'react-router-dom';

export type ButtonLinkProps = LinkProps & ButtonProps

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  to,
  children,
  ...props
}) => {

  const navigate = useNavigate()
  return (
   
    <Button {...props} onClick={() => navigate(to)} >
      {children}
    </Button>
    
  )
}

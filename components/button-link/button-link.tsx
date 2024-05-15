import { Button, ButtonProps } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
export type ButtonLinkProps = LinkProps & ButtonProps

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  ...props
}) => {

  const navigate = useNavigate()
  return (
   
    <Button {...props} onClick={() => navigate(href)} >
      {children}
    </Button>
    
  )
}

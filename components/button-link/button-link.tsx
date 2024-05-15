import { Button, ButtonProps } from '@chakra-ui/react'

export type ButtonLinkProps = LinkProps & ButtonProps

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <a href={href}>
      <Button {...props} >
        {children}
      </Button>
    </a>
  )
}

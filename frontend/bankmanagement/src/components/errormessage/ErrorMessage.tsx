import {Alert} from 'react-bootstrap';

export default function ErrorMessage({variant,children}:any) {
  return (
    <Alert variant={variant} style={{fontSize:15}}>
        <strong>{children}</strong>
    </Alert>
  )
}

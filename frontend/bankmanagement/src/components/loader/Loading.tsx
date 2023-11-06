import {Spinner} from 'react-bootstrap';

function Loading({size=30}) {
  return (
    <div style={{
        display: 'flex',
       justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: '15%',
    position: 'absolute',
    top: '40%',
    left: '40%',
    backgroundColor: '#000',
    opacity: 0.6,
    zIndex:7
    }}>
       <Spinner style={{
        width:size,
        height:size,
        color:'#fff'
       }}
       animation ="border"/>
    </div>
  )
}

export default Loading
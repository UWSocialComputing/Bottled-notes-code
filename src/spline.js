import React, { Suspense } from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

function App() {
  return (
    <div>
      <Suspense fallback={<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '80px'
      }}>
        Loading...
      </div>}>
        <Spline scene="https://prod.spline.design/aRvGUekUwxjKzIor/scene.splinecode" />
      </Suspense>
    </div>
  );
}

export default App;
import React, { Suspense } from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const SplineIsland = (props) => {
  return (
    <div style={{ height: '100vh' }}>
      <Suspense fallback={
        <div>
          Loading...
        </div>
      }>
        <Spline scene="https://prod.spline.design/aRvGUekUwxjKzIor/scene.splinecode" />
      </Suspense>
    </div >
  );
}

export default SplineIsland;
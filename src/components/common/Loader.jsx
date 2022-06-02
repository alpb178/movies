import Lottie from 'react-lottie';
import animationData from '/public/lottie/loading-spinner.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default function Loader({ height, width }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-max">
        <Lottie options={defaultOptions} height={height} width={width} />
      </div>
    </div>
  );
}

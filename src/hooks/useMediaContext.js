import { useEffect, useState } from 'react';
import tailwindConfig from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';
const { theme } = resolveConfig(tailwindConfig);

function useMediaContext() {
  const [isSmall, setIsSmall] = useState(false);
  const [mounted, setMounted] = useState(false);
  // const isXs = useMediaQuery(`(max-width: ${theme.screens.sm})`)
  // const isSm = useMediaQuery(`(min-width: ${theme.screens.sm})`)
  // const isMd = useMediaQuery(`(min-width: ${theme.screens.md})`)

  useEffect(() => {
    const isLg = () => window.matchMedia(`(min-width: ${theme.screens.lg})`).matches;
    if (!mounted) {
      setIsSmall(!isLg());
    }
    const resizeListener = () => {
      setIsSmall(!isLg());
    };
    window.addEventListener('resize', resizeListener);
    setMounted(true);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [isSmall]);
  return { isSmall, isLarge: !isSmall };
}

export default useMediaContext;

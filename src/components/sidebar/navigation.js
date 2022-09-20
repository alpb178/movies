import {
  SearchCircleIcon,
  TableIcon,
  TrendingUpIcon,
  VideoCameraIcon
} from '@heroicons/react/solid';
import {
  BILLBOARD_MOVIES_PAGE,
  POPULAR_MOVIES_CHILDREN_PAGE,
  POPULAR_MOVIES_PAGE,
  SEARCH_MOVIES_PAGE
} from 'lib/constants';

export default [
  {
    name: 'popular-movies',
    link: POPULAR_MOVIES_PAGE,
    icon: TrendingUpIcon
  },
  {
    name: 'popular-movies-children',
    link: POPULAR_MOVIES_CHILDREN_PAGE,
    icon: TableIcon
  },
  {
    name: 'billboard-movie',
    link: BILLBOARD_MOVIES_PAGE,
    icon: VideoCameraIcon
  },
  { name: 'search-page', link: SEARCH_MOVIES_PAGE, icon: SearchCircleIcon }
];

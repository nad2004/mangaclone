// src/components/StoryBreadcrumb.tsx
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  currentTitle: string;
}

export default function StoryBreadcrumb({ currentTitle }: Props) {
  const navigate = useNavigate();

  return (
    <Breadcrumbs className="text-sm [&>*]:text-blue-500 [&>p]:text-gray-500" aria-label="breadcrumb" className="my-4">
      <Link underline="hover" color="inherit" onClick={() => navigate('/')} className="cursor-pointer">
        Trang chủ
      </Link>
      {/* <Link underline="hover" color="inherit" onClick={() => navigate('/stories')} className="cursor-pointer">
        Truyện
      </Link> */}
      <Typography color="text.primary">{currentTitle}</Typography>
    </Breadcrumbs>
  );
}

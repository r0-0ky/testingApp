"use client"

import { Button, Typography } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useRouter } from 'next/navigation'

export const MenuPage: React.FC = () => {
  const router = useRouter()

  const handleClick = (id: string | number) => {
    router.replace(`/test/${id}`);
  }
  return (
    <>
      <Typography variant="h3" className="text-center pt-16 pb-20 font-bold" component="h1">Тестирование</Typography>
      <Button variant="contained" fullWidth={true} sx={{maxWidth: 660, m: 'auto', display: 'flex', justifyContent: "start"}} startIcon={<PlayArrowIcon />} onClick={() => handleClick(1)}>Тест</Button>
    </>
  )
}
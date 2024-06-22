import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box, ThemeProvider } from "@mui/material";
import { light } from "@/src/app/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Супер тесты",
  description: "Тут мы тестим себя",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ThemeProvider theme={light}>
          <Box sx={{height: "100vh", bgcolor: 'background.default'}}>
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
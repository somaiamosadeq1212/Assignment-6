import { Box, Typography, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    // localStorage.setItem("lang", lang);

    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        {t("common.settings")}
      </Typography>

      {/* Language */}
      <Box mb={4}>
        <Typography mb={1}>{t("common.language")}</Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant={i18n.language === "en" ? "contained" : "outlined"}
            onClick={() => changeLanguage("en")}
          >
            EN
          </Button>

          <Button
            variant={i18n.language === "fa" ? "contained" : "outlined"}
            onClick={() => changeLanguage("fa")}
          >
            FA
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
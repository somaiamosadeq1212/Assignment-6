import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Slider, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function GoalForm({ open, onClose, onSave, formData, setFormData }) {
  const { t, i18n } = useTranslation();

  const handleLangFieldChange = (field, lang, value) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [lang]: value,
      },
    });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSliderChange = (e, value) =>
    setFormData({ ...formData, progress: value });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {formData.id ? t("goal.edit") : t("goal.add")}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

        {/* Title EN */}
        <TextField
          label={t("goal.titleEn")}
          value={formData.title?.en || ""}
          onChange={(e) => handleLangFieldChange("title", "en", e.target.value)}
          fullWidth
        />

        {/* Title FA */}
        <TextField
          label={t("goal.titleFa")}
          value={formData.title?.fa || ""}
          onChange={(e) => handleLangFieldChange("title", "fa", e.target.value)}
          fullWidth
        />

        {/* Description EN */}
        <TextField
          label={t("goal.descEn")}
          value={formData.description?.en || ""}
          onChange={(e) => handleLangFieldChange("description", "en", e.target.value)}
          fullWidth
          multiline
        />

        {/* Description FA */}
        <TextField
          label={t("goal.descFa")}
          value={formData.description?.fa || ""}
          onChange={(e) => handleLangFieldChange("description", "fa", e.target.value)}
          fullWidth
          multiline
        />

        {/* Type */}
        <Select name="type" value={formData.type} onChange={handleChange} fullWidth>
          <MenuItem value="Work">{t("categories.work")}</MenuItem>
          <MenuItem value="Personal">{t("categories.personal")}</MenuItem>
          <MenuItem value="Exercise">{t("categories.exercise")}</MenuItem>
          <MenuItem value="Study">{t("categories.study")}</MenuItem>
          <MenuItem value="Other">{t("categories.other")}</MenuItem>
        </Select>

        <TextField
          label={t("goal.startDate")}
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          label={t("goal.endDate")}
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Box sx={{ mt: 1 }}>
          <Typography gutterBottom>
            {t("goal.progress")}: {formData.progress}%
          </Typography>
          <Slider value={formData.progress} onChange={handleSliderChange} min={0} max={100} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button variant="contained" onClick={onSave}>
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang = localStorage.getItem("lang") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          common: {
            settings: "Settings",
            language: "Language",
            theme: "Theme",
            loading: "Loading...",
          },

          navbar: {
            dashboard: "Dashboard",
          },

          sidebar: {
            searchPlaceholder: "Search goals...",
            allGoals: "All Goals",
            archived: "Archived",
            archivedGoals: "Archived Goals",
            settings: "Settings",
            categories: {
              exercise: "Exercise",
              study: "Study",
              work: "Work",
              personal: "Personal",
              other: "Other",
            },
          },

          dashboard: {
            title: "Goals Overview",
            overview:
              "Track your goals, monitor your progress, and stay motivated by building consistent habits every day.",
            noGoals: "No goals found in this category",
            totalGoals: "Total Goals",
            completedGoals: "Completed Goals",
            pendingGoals: "Pending Goals",
            streak: "Streak",
            xp: "XP",
            addGoal: "Add Goal",
          },

          goal: {
            edit: "Edit",
            delete: "Delete",
            complete: "Complete",
            progress: "Progress",
            completed: "Completed",
            inProgress: "In Progress",
            noDescription: "No description",
            resume: "Resume",
            stop: "Stop",
            dates: "Dates",
            backToDashboard: "Back to Dashboard",

            add: "Add New Goal",
            titleEn: "Title (English)",
            titleFa: "Title (Persian)",
            descEn: "Description (English)",
            descFa: "Description (Persian)",
            startDate: "Start Date",
            endDate: "End Date"
          },

          save: "Save",
          cancel: "Cancel",

          summary: {
            welcome: "Welcome back",
            completion: "Completion",
            streak: "Streak",
            xp: "XP",
            newGoal: "New Goal",
          },
        },
      },

      fa: {
        translation: {
          common: {
            settings: "تنظیمات",
            language: "زبان",
            theme: "تم",
            loading: "در حال بارگذاری...",
          },

          navbar: {
            dashboard: "داشبورد",
          },

          sidebar: {
            searchPlaceholder: "جستجوی اهداف...",
            allGoals: "همه اهداف",
            archived: "آرشیف",
            archivedGoals: "اهداف آرشیف شده",
            settings: "تنظیمات",
            categories: {
              exercise: "ورزش",
              study: "مطالعه",
              work: "کار",
              personal: "شخصی",
              other: "سایر",
            },
          },

          dashboard: {
            title: "نمای کلی اهداف",
            overview:
              "اهداف خود را دنبال کنید، پیشرفت‌تان را بررسی کنید و با ایجاد عادت‌های منظم، انگیزه خود را حفظ کنید.",
            noGoals: "هیچ هدفی در این دسته‌بندی پیدا نشد",
            totalGoals: "مجموع اهداف",
            completedGoals: "اهداف تکمیل‌شده",
            pendingGoals: "اهداف در حال انجام",
            streak: "توالی",
            xp: "امتیاز",
            addGoal: "افزودن هدف",
          },

          goal: {
            edit: "ویرایش",
            delete: "حذف",
            complete: "تکمیل",
            progress: "پیشرفت",
            completed: "تکمیل شده",
            inProgress: "در حال انجام",
            noDescription: "بدون توضیح",
            resume: "ادامه",
            stop: "توقف",
            dates: "تاریخ",
            backToDashboard: "بازگشت به داشبورد",

            add: "افزودن هدف جدید",
            titleEn: "عنوان (انگلیسی)",
            titleFa: "عنوان (فارسی)",
            descEn: "توضیحات (انگلیسی)",
            descFa: "توضیحات (فارسی)",
            startDate: "تاریخ شروع",
            endDate: "تاریخ پایان"
          },

          save: "ذخیره",
          cancel: "لغو",

          summary: {
            welcome: "خوش آمدید",
            completion: "تکمیل",
            streak: "توالی",
            xp: "امتیاز",
            newGoal: "هدف جدید",
          },
        },
      },
    },

    lng: savedLang,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

// sync language
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;
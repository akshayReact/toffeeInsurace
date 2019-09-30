// const BASE_URL = "http://13.235.151.38:10010";
 const BASE_URL = "http://mtp.truminds.co.in:10030";
// const BASE_URL = "http://10.206.14.185:10010";
export const APP_APIS = {
  ALL_CATEGORIES:BASE_URL+"/categories",
  LOGIN_API:BASE_URL+"/auth/login",
  SIGNUP_API:BASE_URL+"/auth/signup",
  USER_CATEGORIES: BASE_URL + "/categorybookmarks",
  SHOW_EXAMS: BASE_URL + "/exams",
  SHOW_TESTSID: BASE_URL + "/mocktests",
  SHOW_TESTS: BASE_URL + "/mocktests?filter=status&search=published&",
  ENROLLED_TESTS:BASE_URL+"/mocktestenrollments",
  WISHLIST_TESTS:BASE_URL+"/mocktestbookmarks",
  RECOMMENDATIONS:BASE_URL+"/recommendation",
  FETCH_EXAMS :BASE_URL+"/exams",
  TESTPAPER_API:BASE_URL+"/testtakermocktests",
  ALL_PROVIDERS:BASE_URL+"/providers",
  SLIDERS_LIST:BASE_URL+"/mobilesliders",
  ADD_TO_CATEGORY:BASE_URL+"/categorybookmarks",
  EULA_API:BASE_URL+"/settings",
  RESULTS_API:BASE_URL+"/results",
  USERS_API:BASE_URL+"/users" 
  
};


import en from "./messages/en.json";
import enAppTerms from "./messages/modules/en/app-terms.json";
import enDashboardPage from "./messages/modules/en/dashboard-page.json";
import enDeliveryPage from "./messages/modules/en/delivery-page.json";
import enPaymentModal from "./messages/modules/en/payment-modal.json";
import enPaymentServicePage from "./messages/modules/en/payment-service-page.json";
import enPlaceholderPages from "./messages/modules/en/placeholder-pages.json";
import enRouterUi from "./messages/modules/en/router-ui.json";
import enSharedUi from "./messages/modules/en/shared-ui.json";

type Messages = typeof en
  & typeof enAppTerms
  & typeof enDashboardPage
  & typeof enDeliveryPage
  & typeof enPaymentModal
  & typeof enPaymentServicePage
  & typeof enPlaceholderPages
  & typeof enRouterUi
  & typeof enSharedUi;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

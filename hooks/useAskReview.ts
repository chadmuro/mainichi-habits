import * as StoreReview from "expo-store-review";
import { useSettingsState } from "../store/settings";
import { useCheckState } from "../store/checks";

// Update number later if want to ask for reviews again in future
const REVIEW_COUNT = 0;

export function useAskReview() {
  const { updateSettings, settings } = useSettingsState();
  const { checks } = useCheckState();

  async function askReview() {
    if (
      settings.get()?.ask_review === REVIEW_COUNT &&
      checks.get().length > 30
    ) {
      if (await StoreReview.hasAction()) {
        StoreReview.requestReview();
        updateSettings("ask_review", REVIEW_COUNT + 1);
      }
    }
  }

  return { askReview };
}

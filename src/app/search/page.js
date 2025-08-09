// app/search/page.tsx or .js
import SearchResultsPage from "@/component/searchProduct/SearchResultsPage";
import { Suspense } from "react";


export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchResultsPage />
    </Suspense>
  );
}

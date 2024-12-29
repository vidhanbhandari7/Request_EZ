import Header from "@/components/Header";
import Url from "@/components/Url";
import RequestTabs from "@/components/ui/RequestTabs";
import { DataContextProvider } from "./context/DataContext";

export default function InputWithButton() {
  return (
    <DataContextProvider>
      <Header />
      <Url />
      <RequestTabs />
    </DataContextProvider>
  );
}

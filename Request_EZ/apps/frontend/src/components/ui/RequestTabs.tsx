"use client";

import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface KeyValuePair {
  id: number;
  key: string;
  value: string;
}

function KeyValueTable({
  items,
  setItems,
  title,
}: {
  items: KeyValuePair[];
  setItems: React.Dispatch<React.SetStateAction<KeyValuePair[]>>;
  title: string;
}) {
  const addItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([...items, { id: newId, key: "", value: "" }]);
  };

  const updateItem = (id: number, field: "key" | "value", value: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/5">Key</TableHead>
            <TableHead className="w-2/5">Value</TableHead>
            <TableHead className="w-1/5"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Input
                  value={item.key}
                  onChange={(e) => updateItem(item.id, "key", e.target.value)}
                  placeholder={`${title} key`}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={item.value}
                  onChange={(e) => updateItem(item.id, "value", e.target.value)}
                  placeholder={`${title} value`}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${title.toLowerCase()}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={addItem}>
        <Plus className="mr-2 h-4 w-4" /> Add {title}
      </Button>
    </div>
  );
}

export default function RequestTabs() {
  // const [headers, setHeaders] = useState<KeyValuePair[]>([
  //   { id: 1, key: "", value: "" },
  // ]);
  // const [params, setParams] = useState<KeyValuePair[]>([
  //   { id: 1, key: "", value: "" },
  // ]);
  // const [body, setBody] = useState("");
  const { headers, setHeaders, params, setParams, body, setBody } = useContext(
    DataContext
  ) as any;
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Request Details</h2>
      <Tabs defaultValue="body" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="body">BODY</TabsTrigger>
          <TabsTrigger value="params">PARAMS</TabsTrigger>
          <TabsTrigger value="headers">HEADERS</TabsTrigger>
        </TabsList>
        <div className="border rounded-lg mt-4">
          <TabsContent value="body" className="p-4">
            <Textarea
              placeholder="Enter request body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[200px] w-full"
            />
          </TabsContent>
          <TabsContent value="params" className="p-4">
            <KeyValueTable items={params} setItems={setParams} title="Param" />
          </TabsContent>
          <TabsContent value="headers" className="p-4">
            <KeyValueTable
              items={headers}
              setItems={setHeaders}
              title="Header"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

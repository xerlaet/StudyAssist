"use client";

import {
  Search,
  Folder,
  FileText,
  Download,
  Plus,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";
import { auth } from "@/lib/firebase"; // Assuming auth is already set up
import { useState, useEffect } from "react";

const storage = getStorage();
const db = getFirestore();

export default function ResourcePage() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !auth.currentUser) return;

    try {
      const storageRef = ref(storage, `uploads/${auth.currentUser.uid}/${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      const fileDoc = {
        name: file.name,
        url: downloadURL,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "users", auth.currentUser.uid, "resourceHub"), fileDoc);

      setFiles((prevFiles) => [...prevFiles, { id: docRef.id, ...fileDoc }]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDeleteFile = async (fileId: string, fileName: string) => {
    if (!auth.currentUser) return;

    try {
      // Delete the file from Firebase Storage
      const storageRef = ref(storage, `uploads/${auth.currentUser.uid}/${fileName}`);
      await deleteObject(storageRef);

      // Delete the file metadata from Firestore
      const fileDocRef = doc(db, "users", auth.currentUser.uid, "resourceHub", fileId);
      await deleteDoc(fileDocRef);

      // Update local state
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      if (!auth.currentUser) return;

      try {
        const snapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "resourceHub"));
        const fetchedFiles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched files:", fetchedFiles); // Debugging line
        const validFiles = fetchedFiles.filter((file) => file.name && file.url && file.size);
        setFiles(validFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    console.log("Files state:", files);
  }, [files]);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resource Hub</h1>
        <button
          onClick={() => document.getElementById("file-input")?.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Upload File
        </button>
        <input
          id="file-input"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {/* File List */}
      <Card className="p-4">
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4 bg-white flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-md border border-blue-100">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {file.type} • {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 font-medium"
                  >
                    <Download className="h-3 w-3" /> Download
                  </a>
                  <button
                    onClick={() => handleDeleteFile(file.id, file.name)}
                    className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

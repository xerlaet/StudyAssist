import {
  Search,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Download,
  Plus,
  MoreHorizontal,
  Share,
  PenLine,
  FolderUp,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ResourcePage() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resource Hub</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" /> Upload File
        </button>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Subjects</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Physics</option>
            </select>
            <select className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Types</option>
              <option>Documents</option>
              <option>Images</option>
              <option>Videos</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Folders */}
        <div className="md:col-span-1 space-y-8">
          {/* My Folders */}
          <Card className="overflow-hidden border-2 border-gray-100">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>My Folders</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Folder 1 */}
                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-center gap-3">
                    <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
                      <Folder className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Computer Science</p>
                      <p className="text-xs text-gray-500">24 files</p>
                    </div>
                  </div>
                </div>

                {/* Folder 2 */}
                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-center gap-3">
                    <div className="bg-cyan-50 p-3 rounded-md border border-cyan-100">
                      <Folder className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-medium">Mathematics</p>
                      <p className="text-xs text-gray-500">18 files</p>
                    </div>
                  </div>
                </div>

                {/* Folder 3 */}
                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-center gap-3">
                    <div className="bg-pink-50 p-3 rounded-md border border-pink-100">
                      <Folder className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium">Physics</p>
                      <p className="text-xs text-gray-500">12 files</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shared with Me */}
          <Card className="overflow-hidden border-2 border-gray-100">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Shared with Me</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-md border border-blue-100">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Group Project Outline</p>
                        <p className="text-xs text-gray-500">Shared by Alex Chen</p>
                      </div>
                    </div>
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
      <MoreHorizontal className="h-4 w-4" />
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    className="bg-white border border-gray-200 rounded-md shadow-md p-1 w-48"
  >
    <DropdownMenuItem className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2 cursor-pointer">
      <Share className="h-4 w-4" /> Share
    </DropdownMenuItem>
    <DropdownMenuItem className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2 cursor-pointer">
      <PenLine className="h-4 w-4" /> Rename
    </DropdownMenuItem>
    <DropdownMenuItem className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2 cursor-pointer">
      <FolderUp className="h-4 w-4" /> Move to
    </DropdownMenuItem>

    <DropdownMenuSeparator className="my-1 border-t border-gray-200" />

    <DropdownMenuItem className="px-3 py-2 hover:bg-red-50 focus:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer">
      <Trash2 className="h-4 w-4" /> Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                  </div>
                </div>

                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-50 p-2 rounded-md border border-green-100">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Study Guide - Midterm</p>
                        <p className="text-xs text-gray-500">Shared by Sarah Johnson</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Share className="h-4 w-4" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <PenLine className="h-4 w-4" /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <FolderUp className="h-4 w-4" /> Move to
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Files */}
        <div className="md:col-span-2">
          <Card className="overflow-hidden border-2 border-gray-100 h-full">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Recent Files</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* File 1 */}
                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-md border border-blue-100">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Data Structures Notes</p>
                        <p className="text-xs text-gray-500">PDF • 2.4 MB • Added 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 font-medium">
                        <Download className="h-3 w-3" /> Download
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Share className="h-4 w-4" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <PenLine className="h-4 w-4" /> Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <FolderUp className="h-4 w-4" /> Move to
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                {/* File 2 */}
                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-50 p-2 rounded-md border border-green-100">
                        <ImageIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Algorithm Flowcharts</p>
                        <p className="text-xs text-gray-500">PNG • 1.8 MB • Added 5 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 font-medium">
                        <Download className="h-3 w-3" /> Download
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Share className="h-4 w-4" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <PenLine className="h-4 w-4" /> Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <FolderUp className="h-4 w-4" /> Move to
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                {/* File 3 */}
                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-50 p-2 rounded-md border border-purple-100">
                        <Video className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Linear Algebra Tutorial</p>
                        <p className="text-xs text-gray-500">MP4 • 45:20 • Added 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 font-medium">
                        <Download className="h-3 w-3" /> Download
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Share className="h-4 w-4" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <PenLine className="h-4 w-4" /> Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <FolderUp className="h-4 w-4" /> Move to
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                {/* File 4 */}
                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-md border border-blue-100">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Research Paper Draft</p>
                        <p className="text-xs text-gray-500">DOCX • 3.1 MB • Added 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 font-medium">
                        <Download className="h-3 w-3" /> Download
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Share className="h-4 w-4" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <PenLine className="h-4 w-4" /> Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <FolderUp className="h-4 w-4" /> Move to
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                {/* File 5 */}
                <div className="border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 bg-white flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-50 p-2 rounded-md border border-amber-100">
                        <FileText className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Study Schedule</p>
                        <p className="text-xs text-gray-500">PDF • 0.8 MB • Added 2 weeks ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 font-medium">
                        <Download className="h-3 w-3" /> Download
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Share className="h-4 w-4" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <PenLine className="h-4 w-4" /> Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <FolderUp className="h-4 w-4" /> Move to
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

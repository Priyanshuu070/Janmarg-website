import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Map, Settings, HelpCircle, FileText, Search, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useNavigate, useLocation } from "react-router-dom";
import ReportCard from "./ReportCard";
import mockReportsData from "@/data/mockReports.json";


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter reports based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredReports([]);
      setIsSearchActive(false);
      return;
    }

    setIsSearchActive(true);
    const query = searchQuery.toLowerCase();
    const filtered = mockReportsData.reports.filter((report) =>
      report.title.toLowerCase().includes(query) ||
      report.description?.toLowerCase().includes(query) ||
      report.status.toLowerCase().includes(query) ||
      report.reporter.name.toLowerCase().includes(query) ||
      report.ward.name.toLowerCase().includes(query) ||
      report.issueType?.title.toLowerCase().includes(query) ||
      report.department?.name.toLowerCase().includes(query) ||
      report.address?.toLowerCase().includes(query) ||
      report.tags?.some(tag => tag.toLowerCase().includes(query))
    );
    setFilteredReports(filtered);
  }, [searchQuery]);

  const handleCloseSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
    setFilteredReports([]);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-[#2E6A56] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#2E6A56] font-['Poppins']">JANMARG</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E6A56] focus:border-[#2E6A56]"
              />
              {searchQuery && (
                <button
                  onClick={handleCloseSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
          {/* Navigation Links - Different for Landing vs Dashboard */}
          <div className="hidden md:flex items-end space-x-4">
            {isLandingPage ? (
              <>
                <button
                  onClick={() => scrollToSection("user-type-selector")}
                  className="text-[#4A4A4A] hover:text-[#2E6A56] transition-colors font-['Inter'] px-3 py-2 rounded-md hover:bg-[#EFEFEF]"
                  >
                  Offerings
                </button>
                <button
                  onClick={() => scrollToSection("user-type-selector")}
                  className="text-[#4A4A4A] hover:text-[#2E6A56] transition-colors font-['Inter'] px-3 py-2 rounded-md hover:bg-[#EFEFEF]"
                  >
                  The Community
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-[#4A4A4A] hover:text-[#2E6A56] transition-colors font-['Inter'] px-3 py-2 rounded-md hover:bg-[#EFEFEF]"
                  >
                  How It Works
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="flex items-center space-x-2"
                  >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2"
                  >
                  <Map className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help</span>
                </Button>
              </>
            )}
          </div>

          {/* Language Selector and CTA */}
          <div className="flex items-center space-x-3">
            <LanguageSelector variant="compact" />
            {isLandingPage && (
              <Button
              size="sm"
              className="bg-[#2E6A56] hover:bg-[#1f4a3a] text-white px-5 py-2 font-medium transition-all duration-200"
              onClick={() => navigate("/login")}
              >
                Try the App
              </Button>
            )}
          </div>
        </div>
      </div>
      </div>
      
      {/* Search Overlay */}
      {isSearchActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 top-16">
          <div className="absolute top-0 left-0 right-0 bg-white shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="max-w-6xl mx-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">
                  Search Results ({filteredReports.length})
                </h3>
                <button
                  onClick={handleCloseSearch}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {filteredReports.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No reports found matching your search.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onView={() => {
                        navigate(`/reports/${report.id}`);
                        handleCloseSearch();
                      }}
                      onUpvote={() => {
                        // Handle upvote logic
                        console.log("Upvoted report:", report.id);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

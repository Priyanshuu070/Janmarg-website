import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getBadgeColors, getIconColor } from "@/lib/badgeColors";
import {
  MapPin,
  Calendar,
  User,
  Building2,
  ThumbsUp,
  Eye,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  FileText,
  Camera,
  Tag,
  Shield
} from "lucide-react";

interface Media {
  id: string;
  url: string;
  mimeType: string;
  caption?: string;
}

interface Reporter {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Ward {
  id: string;
  name: string;
  state: string;
  district?: string;
}

interface IssueType {
  id: string;
  title: string;
  code?: string;
}

interface Department {
  id: string;
  name: string;  
  code?: string;
}

interface Report {
  id: string;
  title: string;
  description?: string;
  reporter: Reporter;
  ward: Ward;
  issueType?: IssueType;
  department?: Department;
  status: string;
  severity: number;
  isSensitive: boolean;
  isSpam: boolean;
  isDuplicate: boolean;
  noOfDuplicates: number;
  duplicateOfId?: string;
  latitude: number;
  longitude: number;
  address?: string;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  media?: Media[];
  tags?: string[];
}

interface ReportCardProps {
  report: Report;
  onView?: (reportId: string) => void;
  onEdit?: (reportId: string) => void;
  onUpvote?: (reportId: string) => void;
  onConvertToTender?: (report: Report) => void;
  className?: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "OPEN":
      return <AlertTriangle className="w-4 h-4" />;
    case "IN_PROGRESS":
      return <Play className="w-4 h-4" />;
    case "PENDING_CITIZEN_REVIEW":
      return <Clock className="w-4 h-4" />;
    case "COMPLETED":
    case "VERIFIED":
    case "CLOSED":
      return <CheckCircle className="w-4 h-4" />;
    case "REJECTED":
      return <XCircle className="w-4 h-4" />;
    case "IN_BIDDING":
      return <FileText className="w-4 h-4" />;
    case "ASSIGNED":
      return <User className="w-4 h-4" />;
    case "VALIDATED":
      return <Shield className="w-4 h-4" />;
    default:
      return <AlertTriangle className="w-4 h-4" />;
  }
};

const getStatusDisplayText = (status: string) => {
  switch (status) {
    case "PENDING_CITIZEN_REVIEW":
      return "Pending Review";
    case "IN_PROGRESS":
      return "In Progress";
    case "IN_BIDDING":
      return "In Bidding";
    default:
      return status.replace(/_/g, ' ');
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const getSeverityColor = (severity: number) => {
  if (severity >= 9) return "text-red-600 bg-red-50";
  if (severity >= 7) return "text-orange-600 bg-orange-50";
  if (severity >= 5) return "text-yellow-600 bg-yellow-50";
  return "text-green-600 bg-green-50";
};

const getSeverityLabel = (severity: number) => {
  if (severity >= 9) return "Critical";
  if (severity >= 7) return "High";
  if (severity >= 5) return "Medium";
  return "Low";
};

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  onView,
  onEdit,
  onUpvote,
  onConvertToTender,
  className = ""
}) => {
  const statusColors = getBadgeColors.status(report.status);
  const iconColor = getIconColor("info");

  return (
    <Card className={`w-full bg-white border border-gray-200 hover:border-[#2E6A56] transition-all duration-200 hover:shadow-lg ${className}`}>
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 font-['Poppins'] truncate">
                {report.title}
              </h3>
              {report.isSensitive && (
                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                  <Shield className="w-3 h-3 mr-1" />
                  Sensitive
                </Badge>
              )}
              {report.isDuplicate && (
                <Badge variant="outline" className="bg-gray-50 text-gray-600">
                  Duplicate
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{report.reporter.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(report.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{report.ward.name}, {report.ward.state}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Badge 
              className={`${statusColors} flex items-center gap-1`}
            >
              {getStatusIcon(report.status)}
              {getStatusDisplayText(report.status)}
            </Badge>
            <Badge className={`px-2 py-1 text-xs font-medium ${getSeverityColor(report.severity)}`}>
              {getSeverityLabel(report.severity)}
            </Badge>
          </div>
        </div>

        {/* Description */}
        {report.description && (
          <p className="text-gray-700 text-sm leading-relaxed mb-4 font-['Inter']">
            {report.description.length > 200 
              ? `${report.description.substring(0, 200)}...` 
              : report.description
            }
          </p>
        )}

        {/* Department & Issue Type */}
        <div className="flex items-center gap-6 mb-4">
          {report.department && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {report.department.name}
                {report.department.code && (
                  <span className="text-gray-500 ml-1">({report.department.code})</span>
                )}
              </span>
            </div>
          )}
          {report.issueType && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{report.issueType.title}</span>
            </div>
          )}
        </div>

        {/* Address */}
        {report.address && (
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600 leading-relaxed">
              {report.address}
            </span>
          </div>
        )}

        {/* Media Section */}
        {report.media && report.media.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Attachments ({report.media.length})
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {report.media.slice(0, 3).map((media) => (
                <div key={media.id} className="flex-shrink-0">
                  <img
                    src={media.url}
                    alt={media.caption || "Report media"}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              ))}
              {report.media.length > 3 && (
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-600">+{report.media.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {report.tags && report.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {report.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <ThumbsUp className="w-4 h-4" />
              <span>{report.upvotes}</span>
            </div>
            {report.noOfDuplicates > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{report.noOfDuplicates} similar</span>
              </div>
            )}
            <div className="text-xs text-gray-500">
              ID: {report.id.slice(-8).toUpperCase()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpvote?.(report.id)}
              className="flex items-center gap-1 text-[#2E6A56] border-[#2E6A56] hover:bg-[#2E6A56] hover:text-white"
            >
              <ThumbsUp className="w-3 h-3" />
              Upvote
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView?.(report.id)}
              className="flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              View
            </Button>
            {onConvertToTender && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onConvertToTender(report)}
                className="flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <FileText className="w-3 h-3" />
                Forward to Bidding
              </Button>
            )}
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(report.id)}
                className="flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReportCard;
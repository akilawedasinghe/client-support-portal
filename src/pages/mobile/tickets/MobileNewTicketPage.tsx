
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Send, 
  FileText, 
  AlertCircle, 
  HelpCircle, 
  CreditCard,
  CheckCircle2,
  FileImage,
  X
} from "lucide-react";

const MobileNewTicketPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    priority: "medium",
    attachments: [] as File[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles].slice(0, 5) // Limit to 5 files
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.type) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Ticket created successfully");
      setIsSubmitting(false);
      navigate("/mobile/tickets");
    }, 1500);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const ticketTypes = [
    { value: "technical", label: "Technical Issue", icon: <AlertCircle className="h-4 w-4 text-amber-500" /> },
    { value: "billing", label: "Billing Question", icon: <CreditCard className="h-4 w-4 text-emerald-500" /> },
    { value: "general", label: "General Inquiry", icon: <HelpCircle className="h-4 w-4 text-blue-500" /> }
  ];

  const priorities = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 px-4 py-4 pb-20">
      {/* Header */}
      <motion.div
        className="mb-6 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 text-white h-9 w-9 rounded-full bg-white/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-white">Create New Ticket</h1>
          <p className="text-sm text-indigo-300">Get support for your issues</p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form 
        onSubmit={handleSubmit}
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-5"
      >
        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center mb-1">
            <FileText className="h-4 w-4 text-indigo-400 mr-2" />
            <Label htmlFor="title" className="text-white font-medium">
              Ticket Title
            </Label>
          </div>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a descriptive title"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-indigo-500"
            required
          />
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center mb-1">
            <AlertCircle className="h-4 w-4 text-indigo-400 mr-2" />
            <Label htmlFor="type" className="text-white font-medium">
              Issue Type
            </Label>
          </div>
          <Select 
            value={formData.type}
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-indigo-500">
              <SelectValue placeholder="Select issue type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {ticketTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className="text-white hover:bg-slate-700">
                  <div className="flex items-center">
                    {type.icon}
                    <span className="ml-2">{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center mb-1">
            <HelpCircle className="h-4 w-4 text-indigo-400 mr-2" />
            <Label htmlFor="priority" className="text-white font-medium">
              Priority Level
            </Label>
          </div>
          <Select 
            value={formData.priority}
            onValueChange={(value) => handleSelectChange("priority", value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-indigo-500">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {priorities.map((priority) => (
                <SelectItem key={priority.value} value={priority.value} className="text-white hover:bg-slate-700">
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center mb-1">
            <FileText className="h-4 w-4 text-indigo-400 mr-2" />
            <Label htmlFor="description" className="text-white font-medium">
              Description
            </Label>
          </div>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about your issue"
            className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-indigo-500"
            required
          />
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center mb-1">
            <FileImage className="h-4 w-4 text-indigo-400 mr-2" />
            <Label htmlFor="attachments" className="text-white font-medium">
              Attachments (Optional)
            </Label>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              className="border-dashed border-white/20 text-white hover:bg-white/10"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <FileImage className="mr-2 h-4 w-4" />
              Upload files
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
              />
            </Button>
            
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/10 p-2 rounded-md">
                    <div className="flex items-center text-white text-sm truncate">
                      <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate max-w-[200px]">{file.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="pt-4"
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 border-0 text-white py-6 shadow-lg shadow-indigo-900/30"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5 animate-pulse" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Ticket
              </>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default MobileNewTicketPage;

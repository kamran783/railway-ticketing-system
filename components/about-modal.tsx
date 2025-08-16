"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Linkedin, Github, User, GraduationCap, Code, Brain } from "lucide-react"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <User className="w-6 h-6" />
            MOHD KAMRAN AHMED
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <GraduationCap className="w-5 h-5 text-primary" />
              Education
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="font-medium text-foreground">Bachelor of Technology in Information Technology</p>
              <p className="text-muted-foreground">Aspiring Software Developer</p>
            </div>
          </div>

          {/* Skills & Learning */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Code className="w-5 h-5 text-primary" />
              Skills & Learning
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-secondary" />
                  <span className="font-medium">Data Structures & Algorithms</span>
                </div>
                <p className="text-sm text-muted-foreground">Learning DSA in Java</p>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-secondary" />
                  <span className="font-medium">Web Development</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">HTML</Badge>
                  <Badge variant="secondary">CSS</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">React</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Code className="w-5 h-5 text-primary" />
              Experience
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border">
                <p className="font-medium text-foreground">Java Internship</p>
                <p className="text-sm text-muted-foreground">Gained hands-on coding & problem-solving experience</p>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <p className="font-medium text-foreground">Machine Learning Project</p>
                <p className="text-sm text-muted-foreground">Focused on data analysis and predictive modeling</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Mail className="w-5 h-5 text-primary" />
              Contact Information
            </div>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:ahmed22kamran@gmail.com" className="text-primary hover:underline">
                  ahmed22kamran@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+919182967044" className="text-primary hover:underline">
                  +91-9182967044
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <Linkedin className="w-4 h-4 text-primary" />
                <a
                  href="https://www.linkedin.com/in/kamran-ahmed-7571b32a7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <Github className="w-4 h-4 text-primary" />
                <a
                  href="https://github.com/kamran783"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

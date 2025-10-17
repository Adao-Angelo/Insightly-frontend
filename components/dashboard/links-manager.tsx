"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { linksAPI } from "@/lib/api/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2, Link2, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Link {
  id: string;
  title: string;
  url: string;
}

function LinkModal({
  isOpen,
  onClose,
  editingLink,
  onSubmit,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  editingLink: Link | null;
  onSubmit: (data: { title: string; url: string }) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({ title: "", url: "" });

  useEffect(() => {
    if (isOpen) {
      if (editingLink) {
        setFormData({ title: editingLink.title, url: editingLink.url });
      } else {
        setFormData({ title: "", url: "" });
      }
    }
  }, [isOpen, editingLink]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.url) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-background-secondary border border-background-tertiary rounded-xl w-full max-w-md mx-4 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-content-primary">
            {editingLink ? "Edit Link" : "Add New Link"}
          </h2>
          <button
            onClick={onClose}
            className="text-content-secondary hover:text-content-primary transition-colors p-1 rounded-lg hover:bg-background-tertiary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-content-primary mb-2">
              Title
            </label>
            <Input
              placeholder="My YouTube Channel"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-background-tertiary border-background-tertiary text-content-primary placeholder-content-tertiary focus:border-accent-orange"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-content-primary mb-2">
              URL
            </label>
            <Input
              placeholder="https://youtube.com/@mychannel"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="bg-background-tertiary border-background-tertiary text-content-primary placeholder-content-tertiary focus:border-accent-orange"
              type="url"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-accent-orange hover:bg-accent-orange/90 text-content-inverse"
            >
              {isLoading
                ? "Saving..."
                : editingLink
                ? "Update Link"
                : "Add Link"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1 border-background-tertiary text-content-primary hover:bg-background-tertiary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LinksManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const queryClient = useQueryClient();

  const { data: links, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: () => linksAPI.getMyLinks().then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => linksAPI.createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      closeModal();
      toast.success("Link created successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          "Failed to create link. Please try again."
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      linksAPI.updateLink(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      closeModal();
      toast.success("Link updated successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          "Failed to update link. Please try again."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => linksAPI.deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast.success("Link deleted successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          "Failed to delete link. Please try again."
      );
    },
  });

  const openCreateModal = () => {
    setEditingLink(null);
    setIsModalOpen(true);
  };

  const openEditModal = (link: Link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
  };

  const handleSubmit = (formData: { title: string; url: string }) => {
    if (editingLink) {
      updateMutation.mutate({ id: editingLink.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return (
      <div>
        <CardHeader>
          <CardTitle className="text-content-primary">My Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-background-tertiary rounded-xl"
              ></div>
            ))}
          </div>
        </CardContent>
      </div>
    );
  }

  return (
    <>
      <div>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-content-primary">My Links</CardTitle>
          <Button onClick={openCreateModal}>
            <Plus className="h-4 w-4" />
            <span>Add Link</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {links?.map((link: Link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 bg-background-tertiary rounded-xl border border-background-tertiary  transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="bg-accent-orange w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0">
                    <Link2 className="text-content-inverse h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-content-primary truncate">
                      {link.title}
                    </p>
                    <p className="text-sm text-content-secondary truncate">
                      {link.url}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button
                    size="sm"
                    onClick={() => openEditModal(link)}
                    disabled={updateMutation.isPending}
                    variant="secondary"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this link?")
                      ) {
                        deleteMutation.mutate(link.id);
                      }
                    }}
                    disabled={deleteMutation.isPending}
                    variant="secondary"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {links?.length === 0 && (
              <div className="text-center py-12 text-content-secondary">
                <Link2 className="h-16 w-16 mx-auto mb-4 text-accent-orange opacity-50" />
                <p className="text-lg font-medium mb-2 text-content-primary">
                  No links yet
                </p>
                <p className="text-sm mb-6">
                  Add your first link to get started!
                </p>
                <Button
                  onClick={openCreateModal}
                  className="bg-accent-orange hover:bg-accent-orange/90 text-content-inverse"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Link
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </div>

      <LinkModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingLink={editingLink}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
}

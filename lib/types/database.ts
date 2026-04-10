export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type NotificationPreference = "instant" | "digest" | "never";
export type PostType = "lend" | "give" | "request" | "skill";
export type PostStatus = "active" | "claimed" | "fulfilled" | "lent";
export type MemberRole = "member" | "admin";
export type MemberStatus = "pending" | "active";
export type PostDirection = "offered" | "needed";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          display_name: string;
          neighborhood: string;
          phone: string | null;
          bio: string | null;
          notification_preference: NotificationPreference;
          onboarding_complete: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string;
          neighborhood?: string;
          phone?: string | null;
          bio?: string | null;
          notification_preference?: NotificationPreference;
          onboarding_complete?: boolean;
          created_at?: string;
        };
        Update: {
          display_name?: string;
          neighborhood?: string;
          phone?: string | null;
          bio?: string | null;
          notification_preference?: NotificationPreference;
          onboarding_complete?: boolean;
        };
      };
      communities: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          location_label: string;
          is_listed: boolean;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          location_label: string;
          is_listed?: boolean;
          created_by: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string;
          location_label?: string;
          is_listed?: boolean;
        };
      };
      community_members: {
        Row: {
          id: string;
          community_id: string;
          user_id: string;
          role: MemberRole;
          status: MemberStatus;
          request_note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          community_id: string;
          user_id: string;
          role?: MemberRole;
          status?: MemberStatus;
          request_note?: string | null;
          created_at?: string;
        };
        Update: {
          role?: MemberRole;
          status?: MemberStatus;
        };
      };
      posts: {
        Row: {
          id: string;
          community_id: string;
          user_id: string;
          type: PostType;
          title: string;
          description: string;
          icon_key: string;
          category: string;
          condition: string | null;
          urgency: string | null;
          direction: PostDirection | null;
          availability_note: string | null;
          status: PostStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          community_id: string;
          user_id: string;
          type: PostType;
          title: string;
          description: string;
          icon_key: string;
          category: string;
          condition?: string | null;
          urgency?: string | null;
          direction?: PostDirection | null;
          availability_note?: string | null;
          status?: PostStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          icon_key?: string;
          category?: string;
          condition?: string | null;
          urgency?: string | null;
          direction?: PostDirection | null;
          availability_note?: string | null;
          status?: PostStatus;
          updated_at?: string;
        };
      };
      invite_tokens: {
        Row: {
          id: string;
          token: string;
          community_id: string;
          created_by: string;
          expires_at: string;
          used_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          token: string;
          community_id: string;
          created_by: string;
          expires_at: string;
          used_at?: string | null;
          created_at?: string;
        };
        Update: {
          used_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Community = Database["public"]["Tables"]["communities"]["Row"];
export type CommunityMember =
  Database["public"]["Tables"]["community_members"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type InviteToken = Database["public"]["Tables"]["invite_tokens"]["Row"];

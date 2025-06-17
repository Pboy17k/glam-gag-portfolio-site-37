export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_accounts: {
        Row: {
          created_at: string | null
          password: string
          username: string
        }
        Insert: {
          created_at?: string | null
          password: string
          username: string
        }
        Update: {
          created_at?: string | null
          password?: string
          username?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          last_login: string | null
          name: string
          password_hash: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          name: string
          password_hash: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          name?: string
          password_hash?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string | null
          data: Json
          id: number
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: never
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: never
        }
        Relationships: []
      }
      custom_images: {
        Row: {
          created_at: string | null
          key: string
          value: string
        }
        Insert: {
          created_at?: string | null
          key: string
          value: string
        }
        Update: {
          created_at?: string | null
          key?: string
          value?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          upload_date: string
          url: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          upload_date?: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          upload_date?: string
          url?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          alt: string
          category: string
          created_at: string | null
          id: number
          src: string
          type: string
        }
        Insert: {
          alt: string
          category: string
          created_at?: string | null
          id: number
          src: string
          type: string
        }
        Update: {
          alt?: string
          category?: string
          created_at?: string | null
          id?: number
          src?: string
          type?: string
        }
        Relationships: []
      }
      hero_images: {
        Row: {
          active: boolean
          created_at: string
          display_order: number
          id: string
          subtitle: string
          title: string
          updated_at: string
          upload_date: string
          url: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          display_order?: number
          id?: string
          subtitle: string
          title: string
          updated_at?: string
          upload_date?: string
          url: string
        }
        Update: {
          active?: boolean
          created_at?: string
          display_order?: number
          id?: string
          subtitle?: string
          title?: string
          updated_at?: string
          upload_date?: string
          url?: string
        }
        Relationships: []
      }
      login_attempts: {
        Row: {
          attempt_count: number
          created_at: string
          email: string
          id: string
          ip_address: string | null
          last_attempt: string
          user_agent: string | null
        }
        Insert: {
          attempt_count?: number
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          last_attempt?: string
          user_agent?: string | null
        }
        Update: {
          attempt_count?: number
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          last_attempt?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          date: string
          id: string
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          date: string
          id?: string
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          date?: string
          id?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

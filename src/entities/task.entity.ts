import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 300 })
  description: string;

  @Column({ length: 50 })
  color: string;

  @Column({ default: false })
  favorite: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;
}

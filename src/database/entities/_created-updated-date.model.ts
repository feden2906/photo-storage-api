import { BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreatedUpdatedDateModel {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  updated: Date;

  @BeforeUpdate()
  updateDates() {
    this.updated = new Date();
  }
}

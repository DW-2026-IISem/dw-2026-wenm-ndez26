export interface OrderedContent {
  order: number;
}

export class LearningContentDomainService {
  validateOrder(order: number): void {
    if (!Number.isInteger(order) || order < 1) {
      throw new Error(
        'El orden debe ser un entero mayor a 0',
      );
    }
  }

  getNextOrder(items: OrderedContent[]): number {
    if (!items.length) {
      return 1;
    }

    return (
      Math.max(
        ...items.map((item) => item.order),
      ) + 1
    );
  }
}

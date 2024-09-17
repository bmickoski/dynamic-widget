import { WidgetType } from '../components/dashboard/widgets/widget-type-enum';

export interface Widget {
  widget: WidgetType;
  title: string;
  description?: string;
  index?: number;
}

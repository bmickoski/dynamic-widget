import { WidgetType } from '../components/dashboard/widgets/widget-type-enum';

export interface Widget {
  // TODO add widget enum
  widget: WidgetType;
  title: string;
  description: string;
}

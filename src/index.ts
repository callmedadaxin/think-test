import * as ThinkJS from '../node_modules/thinkjs';
import './extend/controller';
import './extend/logic';
import './extend/context';
import './extend/think';
import './extend/service';
import './extend/application';
import './extend/request';
import './extend/response';
import 'think-view';
import 'think-cache';
import 'think-session';
import 'think-mongo'

export const think = ThinkJS.think;
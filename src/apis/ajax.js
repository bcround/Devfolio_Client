import { signIn, deleteAccount } from 'apis/auth';
import { fetchProjects, postProject, editProject } from 'apis/project';
import { postImage } from 'apis/image';
import { getPortfolio, editPortfolio } from 'apis/portfolio';
import { fetchTechStacks, requestNewTechStack } from 'apis/techStacks';
import {
  getProject,
  getIsPressLikeButton,
  postLikeCountPlus,
  delLikeCountMinus,
  deleteProject,
} from 'apis/project';

const ajax = {
  signIn,
  fetchProjects,
  postImage,
  postProject,
  getPortfolio,
  fetchTechStacks,
  getProject,
  getIsPressLikeButton,
  postLikeCountPlus,
  delLikeCountMinus,
  editPortfolio,
  deleteAccount,
  deleteProject,
  editProject,
  requestNewTechStack,
};

export default ajax;

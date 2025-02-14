import { CommentData } from 'types/comment';
import {
  PostData,
  PostAddData,
  PostUpdateData,
  PostRequestOptions
} from 'types/post';
import { IProfile } from 'types/user';

const fetchApi = {
  getLoginlink: async (): Promise<string> => {
    const loginLinkRes: Response = await fetch('/oauth/login');
    return await loginLinkRes.json();
  },
  getuserData: async () => {
    // { data, error }
    const userDataRes: Response = await fetch('/api/data');
    return await userDataRes.json();
  },
  logout: async () => {
    await fetch('/oauth/logout');
  },
  searchUsers: async (keyword: string) => {
    const usersRes: Response = await fetch(`/api/users?keyword=${keyword}`);
    return await usersRes.json();
  },

  getAllUsers: async () => {
    const allusersRes: Response = await fetch('/api/allUsers');
    return await allusersRes.json();
  },

  getPosts: async (
    signal: AbortSignal | null = null,
    option: Partial<PostRequestOptions> = {}
  ): Promise<PostData[]> => {
    const { lastIdx = -1, count = 10, username } = option;
    const response = username
      ? await fetch(
          `/api/posts?username=${username}&lastIdx=${lastIdx}&count=${count}`,
          { signal }
        )
      : await fetch(`/api/posts?lastIdx=${lastIdx}&count=${count}`, { signal });
    const getPostsList = await response.json();
    return getPostsList.map((cur: any) =>
      cur.BTMLikepostidx.length === 0
        ? { ...cur, likeFlag: false }
        : { ...cur, likeFlag: true }
    );
  },

  addPosts: async (postData: PostAddData) => {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    return await response.json();
  },

  updatePosts: async (postIdx: number, postUpdateData: PostUpdateData) => {
    const response = await fetch(`/api/posts/${postIdx}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postUpdateData)
    });
    return await response.json();
  },

  deletePosts: async (postIdx: number) => {
    const response = await fetch(`/api/posts/${postIdx}`, {
      method: 'DELETE'
    });
    return await response.json();
  },

  addLikePost: async (userIdx: number, postIdx: number) => {
    const response = await fetch(`/api/likes/${userIdx}/${postIdx}`, {
      method: 'POST'
    });
    return await response.json();
  },

  updateLikeNum: async (postIdx: number, likeNum: number) => {
    const response = await fetch(`/api/posts/like/${postIdx}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likeNum: likeNum })
    });
    return await response.json();
  },

  uploadImg: async (imglist: FileList) => {
    const formData = new FormData();
    formData.append('imgfile', imglist[0]);

    const fileRes = await fetch('/api/uploadimg', {
      method: 'POST',
      body: formData
    });

    return await fileRes.json(); // {file: s3file, save: true/false}
  },

  getComments: async (postidx: number) => {
    const response = await fetch(`/api/comments/${postidx}`);
    const getCommentsList = await response.json();
    // 여기서 getCommentsList map해서 보내준다.
    return getCommentsList;
  },

  getCommentsNum: async (postidx: number) => {
    const response = await fetch(`/api/comments/${postidx}`);
    const getCommentsList = await response.json();
    return getCommentsList.length;
  },

  addComments: async (addComment: CommentData) => {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addComment)
    });

    return await response.json();
  },

  getProblems: async (groupIdx?: number | null, signal?: AbortSignal) => {
    const response = groupIdx
      ? await fetch(`/api/problems/${groupIdx}`, { signal })
      : await fetch(`/api/problems`, { signal });
    const problems = await response.json();
    return problems;
  },

  insertSolvedProblem: async (problemIdx: number) => {
    const response = await fetch(`/api/problems/correct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ problemIdx })
    });
    return await response.json();
  },

  getSolvedProblems: async (userName: string) => {
    const response = await fetch(`/api/problems/solved/${userName}`);
    return await response.json();
  },

  getJoinedProblems: async (userIdx: number) => {
    const response = await fetch(`/api/problems/joined/${userIdx}`);
    return await response.json();
  },

  getGroupList: async () => {
    const response = await fetch('/api/groups');
    return await response.json();
  },

  getGroup: async (groupIdx: number) => {
    const response = await fetch(`/api/groups/${groupIdx}`);
    return await response.json();
  },

  getJoinedGroups: async (userIdx: number) => {
    const response = await fetch(`/api/groups/joined/${userIdx}`);
    return await response.json();
  },

  joinGroup: async (userIdx: number, groupIdx: number) => {
    const response = await fetch(`/api/joingroup/${userIdx}/${groupIdx}`, {
      method: 'POST'
    });
    return await response.json();
  },

  getUserNumInGroup: async (groupIdx: number) => {
    const response = await fetch(`/api/groups/usernum/${groupIdx}`);
    return await response.json();
  },

  getProfile: async (userName: string) => {
    const response = await fetch(`/api/profile/${userName}`);
    return await response.json();
  },

  updateProfile: async (userUpdateData: IProfile) => {
    const response = await fetch(`/api/profile/${userUpdateData.idx}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userUpdateData)
    });
    return await response.json();
  }
};

export default fetchApi;

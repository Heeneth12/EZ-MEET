export class ParticipantModel {
    id!: number;
    name!: string;
    isSpeaking!: boolean;
    isMuted!: boolean;
    isVideoOff!: boolean;
    isHost!: boolean;
    isScreenSharing!: boolean;
    stream?: MediaStream | null;
    userId?: string; // Socket/peer ID
    videoRef?: React.RefObject<HTMLVideoElement>;
}
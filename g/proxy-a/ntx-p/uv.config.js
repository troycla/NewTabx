self.__uv$config = {
    prefix: '/ultraviolet/_/',
    bare: 'https://incog.dev/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/ultraviolet/uv.handler.js',
    bundle: '/ultraviolet/uv.bundle.js',
    config: '/ultraviolet/uv.config.js',
    sw: '/ultraviolet/uv.sw-handler.js',
};
